
const isCollectionExist = (data, collection_name) => {
     const isExist = data.findIndex((item) => item.name === collection_name) !== -1;
     return (isExist);
}

exports.isCollectionExist = isCollectionExist;