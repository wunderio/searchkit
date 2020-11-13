import { MultiMatchQuery, BoolShould, SimpleQueryString } from '../query';
import { BaseQueryAccessor } from './BaseQueryAccessor';
const assign = require('lodash/assign');
export class QueryAccessor extends BaseQueryAccessor {
    constructor(key, options = {}) {
        super(key);
        this.options = options;
        this.options.queryFields = this.options.queryFields || ['_all'];
    }
    fromQueryObject(ob) {
        super.fromQueryObject(ob);
        if (this.options.onQueryStateChange) {
            this.options.onQueryStateChange();
        }
    }
    buildSharedQuery(query) {
        const queryStr = this.state.getValue();
        if (queryStr) {
            const queryBuilder = this.options.queryBuilder || SimpleQueryString;
            const simpleQuery = queryBuilder(queryStr, assign({ fields: this.options.queryFields }, this.options.queryOptions));
            const queries = [simpleQuery];
            if (this.options.prefixQueryFields) {
                queries.push(MultiMatchQuery(queryStr, assign(this.options.prefixQueryOptions, {
                    type: 'phrase_prefix',
                    fields: this.options.prefixQueryFields
                })));
            }
            query = query.addQuery(BoolShould(queries));
            if (this.options.addToFilters) {
                query = query.addSelectedFilter({
                    name: this.options.title,
                    value: queryStr,
                    id: this.key,
                    remove: () => (this.state = this.state.clear())
                });
            }
            else {
                query = query.setQueryString(queryStr);
            }
            return query;
        }
        return query;
    }
}
//# sourceMappingURL=QueryAccessor.js.map