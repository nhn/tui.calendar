/*eslint-disable*/
var Week = ne.dooray.calendar.Week;
describe('View/Days', function() {
    var view;

    beforeEach(function() {
        loadFixtures('view.html');
        view = new Week(null, document.getElementById('container2'));
    });

    it('Create child views', function() {
        expect(view.childs.length).not.toBe(0);
    });
});
