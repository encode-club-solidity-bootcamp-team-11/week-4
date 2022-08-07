import { ApiProperty } from '@nestjs/swagger';
import { MetadataDto } from './metadata.dto';

export class SetMetadataDto {
  @ApiProperty({
    required: true,
    description: 'Id of the file',
  })
  id: number;
  // @ApiProperty({
  //   required: true,
  //   description: 'Description of NFT',
  // })
  // description: string;
  // @ApiProperty({
  //   required: true,
  //   description: 'External URL of NFT',
  // })
  // external_url: number;
  // @ApiProperty({
  //   required: true,
  //   description: 'URL to image of NFT',
  // })
  // image: string;
  @ApiProperty({
    required: true,
    description: 'File metadata',
    type: MetadataDto
  })
  metadata: MetadataDto;
}
