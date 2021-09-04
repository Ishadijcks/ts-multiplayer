const _ = require('lodash');

export class Diff {
    public static diff(obj1, obj2) {
        return _.reduce(obj1, (result, value, key) => {
            if (_.isPlainObject(value)) {
                result[key] = this.diff(value, obj2[key]);
            } else if (!_.isEqual(value, obj2[key])) {
                result[key] = value;
            }
            return result;
        }, {});
    };
}
