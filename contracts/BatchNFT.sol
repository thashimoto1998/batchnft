pragma solidity >=0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BatchNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    // tokenIdIndex starts from 1
    Counters.Counter private tokenIdIndex;


    constructor() ERC721("batch", "batch") {}
    
    function batchMintAndTransfer(
        address minter,
        address[] memory receivers,
        string memory tokenURI
    ) external onlyOwner {
        for (uint32 i = 0; i < receivers.length; i++) {
            uint256 tokenId = incTokenId();
            _safeMint(minter, tokenId);
            _setTokenURI(tokenId, tokenURI);
            _transfer(minter, receivers[i], tokenId);
        }
    }

    function incTokenId() private returns (uint256) {
        tokenIdIndex.increment();
        return tokenIdIndex.current();
    }
}