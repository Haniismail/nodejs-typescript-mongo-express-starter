"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nestedFilter = exports.getKeysFromNestedQueries = exports.filterQueries = exports.convertFilterObject = void 0;
function convertFilterObject(obj) {
    const convertedObj = {};
    let lastKey;
    for (const key in obj) {
        const nestedKeys = key.split('.');
        lastKey = nestedKeys.pop();
        let currentObj = convertedObj;
        for (const nestedKey of nestedKeys) {
            if (!currentObj[nestedKey]) {
                currentObj[nestedKey] = {};
            }
            currentObj = currentObj[nestedKey];
        }
        currentObj[lastKey] = obj[key];
    }
    return convertedObj;
}
exports.convertFilterObject = convertFilterObject;
const filterQueries = (queries, filter) => {
    const filteredQueries = queries.filter((video) => {
        for (const key in filter) {
            const nestedKeys = key.split('.');
            let currentObj = video;
            let filterKey1 = nestedKeys[0];
            let filterKey2 = nestedKeys[1];
            let value = filter[key];
            return (filterKey2 &&
                currentObj[filterKey1] &&
                currentObj[filterKey1][filterKey2] &&
                ((typeof currentObj[filterKey1][filterKey2] === 'string' &&
                    currentObj[filterKey1][filterKey2].includes(value)) ||
                    (typeof currentObj[filterKey1][filterKey2] !== 'string' &&
                        currentObj[filterKey1][filterKey2] == value)));
        }
    });
    return filteredQueries;
};
exports.filterQueries = filterQueries;
const getKeysFromNestedQueries = (filter) => {
    const keys = [];
    for (const key in filter) {
        const nestedKeys = key.split('.');
        let filterKey = nestedKeys[0];
        keys.push(filterKey);
    }
    return keys;
};
exports.getKeysFromNestedQueries = getKeysFromNestedQueries;
const nestedFilter = async (queries, query) => {
    const queryObj = { ...query };
    const keys = (0, exports.getKeysFromNestedQueries)(query);
    if (Object.keys(query).filter((key) => key.includes('.')).length) {
        const Model = queries.mongooseCollection.conn.models[queries.mongooseCollection.modelName];
        try {
            const data = await Model.find().populate(keys);
            const filteredData = (0, exports.filterQueries)(data, queryObj);
            queries = queries.find({
                _id: filteredData.map((item) => item._id.toString()),
            });
            console.log(filteredData.map((item) => item._id.toString()));
        }
        catch (error) { }
    }
    return queries;
};
exports.nestedFilter = nestedFilter;
//# sourceMappingURL=filter.js.map