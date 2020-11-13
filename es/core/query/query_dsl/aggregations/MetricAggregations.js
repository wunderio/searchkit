import { AggsContainer } from './AggsContainer';
const assign = require('lodash/assign');
export function FieldMetricFactory(metricOp) {
    return (key, field) => AggsContainer(key, {
        [metricOp]: { field }
    });
}
export const CardinalityMetric = FieldMetricFactory('cardinality');
export const MinMetric = FieldMetricFactory('min');
export const MaxMetric = FieldMetricFactory('max');
export const AvgMetric = FieldMetricFactory('avg');
export const SumMetric = FieldMetricFactory('sum');
export const StatsMetric = FieldMetricFactory('stats');
export function TopHitsMetric(key, top_hits) {
    return AggsContainer(key, { top_hits });
}
export function GeoBoundsMetric(key, field, options = {}) {
    return AggsContainer(key, { geo_bounds: assign({ field }, options) });
}
//# sourceMappingURL=MetricAggregations.js.map