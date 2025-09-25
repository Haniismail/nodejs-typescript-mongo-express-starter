"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filter_1 = require("./filter");
class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    // filter() {
    //   const queryObj = { ...this.queryString };
    //   const excludedFields = ['page', 'sort', 'limit', 'fields', 'deleted'];
    //   excludedFields.forEach((el) => delete queryObj[el]);
    //   let queryStr = JSON.stringify(queryObj);
    //   queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    //   queryStr = JSON.parse(queryStr);
    //   const queryStrKeys = Object.keys(queryStr).filter((key) => !key.includes('.'));
    //   console.log(queryStr);
    //   if (queryStrKeys.length) {
    //     const queryOptions = Object.keys(queryStr).map((field: any) => {
    //       if (field === '_id') {
    //         return { [field]: queryStr[field] };
    //       } else if (typeof queryStr[field] === 'object' && queryStr[field].match(/^\d+(\.\d+)?$/)) {
    //         return { [field]: { $regex: (queryStr[field] as any) * 1, $options: 'i' } };
    //       } else {
    //         return { [field]: { $regex: queryStr[field], $options: 'i' } };
    //       }
    //     });
    //     this.query = this.query.find({ $or: { queryOptions } });
    //   }
    //   return this;
    // }
    filter() {
        const queryObj = { ...this.queryString };
        const excludedFields = ['page', 'sort', 'limit', 'fields', 'deleted'];
        excludedFields.forEach((el) => delete queryObj[el]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        queryStr = JSON.parse(queryStr);
        if (Object.keys(queryStr).length) {
            let queryOption = Object.keys(queryStr).map((field) => {
                if (!field.includes('.')) {
                    if (field === '_id') {
                        return { [field]: queryStr[field] };
                    }
                    if (queryStr[field].match(/^\d+(\.\d+)?$/)) {
                        return { [field]: queryStr[field] * 1 };
                    }
                    return { [field]: { $regex: queryStr[field], $options: 'i' } };
                }
            });
            queryOption = queryOption.filter((item) => item !== undefined);
            this.query = queryOption.length ? this.query.find({ $or: queryOption }) : this.query;
        }
        return this;
    }
    async nestedFilter() {
        const queryObj = { ...this.queryString };
        const keys = (0, filter_1.getKeysFromNestedQueries)(this.queryString);
        if (Object.keys(this.queryString).filter((key) => key.includes('.')).length) {
            const Model = this.query.mongooseCollection.conn.models[this.query.mongooseCollection.modelName];
            try {
                const data = await Model.find().populate(keys);
                const filteredData = (0, filter_1.filterQueries)(data, queryObj);
                this.query = this.query.find({
                    _id: filteredData.map((item) => item._id.toString()),
                });
            }
            catch (error) { }
        }
        return this;
    }
    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        }
        else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }
    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        }
        else {
            this.query = this.query.select('-__v');
        }
        return this;
    }
    paginate() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
    search(searchFields) {
        var _a;
        if ((_a = this.queryString) === null || _a === void 0 ? void 0 : _a.search) {
            const queryOption = searchFields.map((field) => ({
                [field]: { $regex: this.queryString.search, $options: 'i' },
            }));
            this.query = this.query.find({ $or: queryOption });
        }
        return this;
    }
}
exports.default = APIFeatures;
//# sourceMappingURL=apiFeatures.js.map