import { Injectable, StreamableFile } from '@nestjs/common';
import * as fs from 'fs';
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import { FileDataDto } from './dtos/file-data.dto';
import { MetadataDto } from './dtos/metadata.dto';
import { FileData } from './schemas/file-data.interface';
import { create } from 'ipfs-http-client';
import { createReadStream } from 'fs';
import { IPFSHTTPClient } from 'ipfs-http-client/types/src/types';
import { concat as uint8ArrayConcat } from 'uint8arrays/concat';

const DB_PATH = '../db/db.json';

@Injectable()
export class AppService {
  db: JsonDB;
  lastId: number;
  ipfsClient: IPFSHTTPClient;

  constructor() {
    this.db = new JsonDB(new Config(DB_PATH, true, true, '/'));
    this.ipfsClient = create({
      host: 'localhost',
      port: 5001,
      protocol: 'http',
    });
    const data = this.db.getData('/');
    this.lastId =
      data && Object.keys(data).length > 0
        ? Math.max(...Object.keys(data).map((key) => Number(key)))
        : -1;
  }

  pushFile(file: FileDataDto) {
    const obj = new FileData(file);
    const fileId = ++this.lastId;
    this.db.push(`/${fileId}`, obj);
    return fileId;
  }

  setMetadata(fileId: number, metadata: MetadataDto) {
    let file: any;
    try {
      file = this.db.getData(`/${fileId}/file`);
    } catch (error) {
      return { error };
    }
    if (!file) return false;
    this.db.push(`/${fileId}/metadata`, metadata);
    return this.get(fileId);
  }

  getAll() {
    const data = this.db.getData('/');
    const mapped = Object.entries(data).map(([k,v]) => {
      return {
        "name": v["metadata"]["name"],
        "description": v["metadata"]["description"],
        "image": v["metadata"]["image"],
        "external_url": `http://localhost:3000/NFT_uri/${k}`
      };
    });
    console.log(mapped);
    return mapped;
    // return this.db.getData('/');
  }

  get(fileId: number) {
    return this.db.getData(`/${fileId}`);
    
  }

  getNFT_id(tokenId: number) {
    const data = this.db.getData(`/${tokenId}`);

    return {
        "name": data["metadata"]["name"],
        "description": data["metadata"]["description"],
        "image": data["metadata"]["image"],
        "external_url": `http://localhost:3000/NFT_uri/${tokenId}`
      };
  }


  getFileStream(filename: string) {
    const fileStream = createReadStream(`../upload/${filename}`);
    return new StreamableFile(fileStream);
  }

  isIpfsNodeOnline() {
    try {
      const state = this.ipfsClient.isOnline();
      return state;
    } catch (error) {
      return error;
    }
  }

  async saveToIpfs(fileId: number) {
    const fileData: FileData = this.get(fileId);
    const fileLocation = `../upload/${fileData.file.storageName}`;
    const fileBytes = fs.readFileSync(fileLocation);
    const ipfsData = await this.ipfsClient.add(fileBytes);
    this.db.push(`/${fileId}/ipfs`, ipfsData);
    return this.get(fileId);
  }

  async getFromIpfs(fileId: number) {
    const fileData: FileData = this.get(fileId);
    if (!fileData.ipfs || !fileData.ipfs.path || fileData.ipfs.path.length == 0)
      throw new Error('File not found');
    const ipfsBytes = this.ipfsClient.cat(fileData.ipfs.path);
    const content = [];
    for await (const chunk of ipfsBytes) {
      content.push(chunk);
    }
    const fileStream = uint8ArrayConcat(content);
    return new StreamableFile(fileStream);
  }
}
