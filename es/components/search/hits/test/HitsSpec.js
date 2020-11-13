import * as React from 'react';
import { mount } from 'enzyme';
import * as sinon from 'sinon';
import { Hits } from '../src/Hits';
import { SearchkitManager, PageSizeAccessor, HighlightAccessor, CustomHighlightAccessor, SourceFilterAccessor } from '../../../../core';
describe('Hits component', () => {
    describe('renders correctly', () => {
        beforeEach(() => {
            this.searchkit = SearchkitManager.mock();
            const customHighlight = { fields: {} };
            this.wrapper = mount(React.createElement(Hits, { searchkit: this.searchkit, hitsPerPage: 10, highlightFields: ['title'], customHighlight: customHighlight, sourceFilter: ['title'] }));
            this.pageSizeAccessor = this.searchkit.getAccessorByType(PageSizeAccessor);
            this.highlightAccessor = this.searchkit.getAccessorByType(HighlightAccessor);
            this.customHighlightAccessor = this.searchkit.getAccessorByType(CustomHighlightAccessor);
            this.sourceFilterAccessor = this.searchkit.getAccessorByType(SourceFilterAccessor);
            this.hasRendered = () => this.wrapper.find('.sk-hits').length == 1;
        });
        it('initalize accessors correctly', () => {
            expect(this.pageSizeAccessor.defaultSize).toBe(10);
            expect(this.customHighlightAccessor.highlightRequest).toEqual({ fields: {} });
            expect(this.highlightAccessor.highlightFields).toEqual({
                fields: { title: {} }
            });
            expect(this.sourceFilterAccessor.source).toEqual(['title']);
        });
        it('does render', () => {
            this.searchkit.initialLoading = false;
            this.searchkit.setResults({
                hits: {
                    hits: [
                        { _id: 1, title: 1 },
                        { _id: 2, title: 2 }
                    ],
                    total: 2
                }
            });
            this.wrapper.update();
            expect(this.hasRendered()).toBeTruthy();
            expect(this.wrapper).toMatchSnapshot();
        });
        it('does not render on no hits', () => {
            this.searchkit.initialLoading = false;
            this.searchkit.setResults({
                hits: {
                    hits: [],
                    total: 0
                }
            });
            this.wrapper.update();
            expect(this.hasRendered()).toBeFalsy();
        });
        it('no longer renders initial view', () => {
            this.searchkit.initialLoading = true;
            this.wrapper.update();
            expect(this.hasRendered()).toBeFalsy();
            expect(this.wrapper.find('.sk-hits__initial-loading')).toHaveLength(0);
        });
        it('custom higher order component', () => {
            this.searchkit.setResults({
                hits: {
                    hits: [
                        { _id: 1, title: 1 },
                        { _id: 2, title: 2 }
                    ],
                    total: 2
                }
            });
            const hit = (props) => React.createElement("div", { className: "foo" }, props.result.title);
            const wrapper = mount(React.createElement(Hits, { searchkit: this.searchkit, itemComponent: hit, hitsPerPage: 10 }));
            expect(wrapper).toMatchSnapshot();
        });
    });
    describe('hits scrollTo', () => {
        beforeEach(() => {
            this.stub = sinon.stub(document, 'querySelector');
            this.addHits = (scrollTo) => {
                this.searchkit = SearchkitManager.mock();
                this.wrapper = mount(React.createElement(Hits, { searchkit: this.searchkit, scrollTo: scrollTo, hitsPerPage: 10 }));
            };
            this.setupTest = (selector) => {
                this.element = {
                    scrollTop: 100
                };
                this.stub.returns(this.element);
                this.addHits(selector);
                this.searchkit.setResults({
                    hits: {
                        hits: [
                            { _id: 1, title: 1 },
                            { _id: 2, title: 2 }
                        ],
                        total: 2
                    }
                });
            };
        });
        afterEach(() => {
            this.stub.restore();
        });
        it('should scroll to body', () => {
            this.setupTest(true);
            expect(this.element.scrollTop).toBe(0);
            expect(this.stub.calledWith('body')).toBe(true);
        });
        it('should scroll to .element', () => {
            this.setupTest('.element');
            expect(this.element.scrollTop).toBe(0);
            expect(this.stub.calledWith('.element')).toBe(true);
        });
        it('no scroll', () => {
            this.setupTest(false);
            expect(this.stub.called).toBe(false);
            expect(this.element.scrollTop).toBe(100);
        });
        it('wont scroll on same results', () => {
            this.setupTest(true);
            expect(this.stub.callCount).toBe(1);
            this.searchkit.setResults({
                hits: {
                    hits: [
                        { _id: 1, title: 1 },
                        { _id: 2, title: 2 }
                    ],
                    total: 2
                }
            });
            expect(this.stub.callCount).toBe(1);
        });
        it('will scroll on new results', () => {
            this.setupTest(true);
            expect(this.stub.callCount).toBe(1);
            this.searchkit.setResults({
                hits: {
                    hits: [
                        { _id: 3, title: 1 },
                        { _id: 4, title: 2 }
                    ],
                    total: 2
                }
            });
            expect(this.stub.callCount).toBe(2);
            //should not scroll on rerender
            this.searchkit.emitter.trigger();
            expect(this.stub.callCount).toBe(2);
        });
        it('wont scroll on outside update', () => {
            this.setupTest(true);
            expect(this.stub.callCount).toBe(1);
            this.searchkit.setResults({
                hits: {
                    hits: [
                        { _id: 3, title: 1 },
                        { _id: 4, title: 2 }
                    ],
                    total: 2
                }
            });
            expect(this.stub.callCount).toBe(2);
            // Update with the same props
            this.wrapper.setProps({
                searchkit: this.seachkit,
                scrollTo: true,
                hitsPerPage: 10
            });
            expect(this.stub.callCount).toBe(2);
        });
    });
});
//# sourceMappingURL=HitsSpec.js.map