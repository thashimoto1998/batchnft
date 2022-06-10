pragma solidity >=0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BatchNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    // tokenIdIndex starts from 1
    Counters.Counter private tokenIdIndex;
    mapping (address => bool) public whiteListAddress;

    modifier onlyWhiteListAddress {
        require(whiteListAddress[msg.sender], "msg.sender is not white list address");
        _;
    }

    event whiteListAddressAdded(address _address);
    event whiteListAddressRemoved(address _address);

    constructor() ERC721("batch", "batch") {}
    
    function batchMintAndTransfer(
        address minter,
        address[] memory receivers,
        string memory tokenURI
    ) external onlyWhiteListAddress {
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

    function addWhiteListAddress(address _address) public onlyOwner {
        require(!whiteListAddress[_address], "address is white list address");
        whiteListAddress[_address] = true;
        emit whiteListAddressAdded(_address);
    }

    function removeWhiteListAddress(address _address) public onlyOwner {
        require(whiteListAddress[_address], "address is not white list address");
        whiteListAddress[_address] = false;
        emit whiteListAddressRemoved(_address);
    }
}