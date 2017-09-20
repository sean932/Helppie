const INIT_STATE = [
    { id: 1, title : 'Tooth paste', link : 'http://www.colgate.com/CP15/en/us/oc/products/toothpaste/images/kids-cavity-protection-toothpaste-outofpack-02.png'},
    { id: 2, title : 'iPhone', link : 'https://support.apple.com/content/dam/edam/applecare/images/en_US/iphone/featured-content-iphone-transfer-content-ios10_2x.png'},
    { id: 3, title : 'Nexus 6p', link : 'https://img.kogan.com/Es0y8-xnCCzGXpNxGnKMpaia1fI=/600x400/http://assets.kogan.com/files/products/HK-PHONES/HUAWEI-BLACK.jpg'},
    { id: 4, title : 'Water', link : 'http://thesecondset.net/wp-content/uploads/2015/12/water-bottle.jpg'},
    { id: 5, title : 'Hoodie', link : 'http://papini.co.uk/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/g/r/greynavy_hoodie.jpg'},
    { id: 6, title : 'Diapers', link : 'http://www.thelearningcommunity.us/Portals/0/images%20of%20kids/Stack%20of%20diapers%20Isolated%20on%20White%20background.jpg'},
];

export default (state = INIT_STATE, action) => {
	switch (action.type) {
		default :
			return state;
	}
}