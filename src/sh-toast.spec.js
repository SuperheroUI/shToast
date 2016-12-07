import React from 'react';
import * as _ from 'lodash';
import Toast from './sh-toast-service';

describe('root', function () {
    beforeEach(function () {
        jasmine.clock().install();
    });

    afterEach(function () {
        jasmine.clock().uninstall();
    });

    it('renders without problems, returns a promise', function () {
        const toast = new Toast('Your content', 'success', 'icon-envelope', 100);
        let promise = toast.open();
        jasmine.clock().tick(5000);
        expect(promise.then).toBeTruthy();
        promise.catch(_.noop);
        toast.close();
        jasmine.clock().tick(5000);
    });

    it('remove add custom class', function () {
        const toast = new Toast('Your content', 'success', 'icon-envelope', 100, 'sh-small');
        let promise = toast.open();
        jasmine.clock().tick(5000);
        expect(document.getElementById('sh-toast').classList).toContain('sh-small');
        promise.catch(_.noop);
        toast.close();
        jasmine.clock().tick(5000);
    });
    it('icons to be added', function () {
        const toast = new Toast('Your content', 'success', 'icon-envelope', 100, 'sh-small');
        toast.open();
        jasmine.clock().tick(5000);
        expect(document.getElementById('sh-icons').classList).toContain('icon-envelope');
        toast.close()
    });
    it('default icons to be added', function () {
        const toast = new Toast('Your content', 'success', null, 100, 'sh-small');
        toast.open();
        jasmine.clock().tick(5000);
        expect(document.getElementById('sh-icons').classList).toContain('icon-info');
        toast.close()
    });
    it('should have default timeout', function () {
        const toast = new Toast('Your content', 'success', null, null, null);
        toast.open();
        jasmine.clock().tick(5000);
        expect(toast.timeout).toBe(2500);
        toast.close()
    });
});
