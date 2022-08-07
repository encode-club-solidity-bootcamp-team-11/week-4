//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFTCollection is ERC721 {
    constructor(uint[] memory tokenIds) ERC721("MyNFTCollection", "MNFT") {
      for (uint i = 0; i < tokenIds.length; i++) {
        _safeMint(msg.sender, tokenIds[i]);
      }
    }

    function _baseURI() internal pure override returns (string memory) {
      return "http://localhost:3000/NFT_uri/";
    }
}
