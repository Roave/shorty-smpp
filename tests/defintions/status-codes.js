'use strict';

const describe = require('mocha').describe;
const expect = require('chai').expect;
const it = require('mocha').it;
const statusCodes = require('../../lib/definitions/status-codes');

describe('definitions/status-codes', () => {
    describe('StatusCodeMap', () => {
        it('defineStatusCode must add status to map under both tag and name', () => {
            const statusCodeMap = new statusCodes.StatusCodeMap();
            statusCodeMap.defineStatusCode(0x00000400, 'ESME_TEST_STATUS', 'Test status code');
            expect(statusCodeMap.has(0x00000400)).to.be.true;
            expect(statusCodeMap.has('ESME_TEST_STATUS')).to.be.true;
            expect(statusCodeMap.get(0x00000400)).to.be.equal(statusCodeMap.get('ESME_TEST_STATUS'));
        });

        it('defineStatusCode must throw on existing tag', () => {
            const statusCodeMap = new statusCodes.StatusCodeMap();
            statusCodeMap.defineStatusCode(0x00000400, 'ESME_TEST_STATUS', 'Test status code');
            expect(() => {
                statusCodeMap.defineStatusCode(0x00000400, 'ESME_TEST_STATUS1', 'Test status code');
            }).to.throw(/is already defined/);
        });

        it('defineStatusCode must throw on existing name', () => {
            const statusCodeMap = new statusCodes.StatusCodeMap();
            statusCodeMap.defineStatusCode(0x00000400, 'ESME_TEST_STATUS', 'Test status code');
            expect(() => {
                statusCodeMap.defineStatusCode(0x00000401, 'ESME_TEST_STATUS', 'Test status code');
            }).to.throw(/is already defined/);
        });

        it('removeStatusCode must remove entry by tag', () => {
            const statusCodeMap = new statusCodes.StatusCodeMap();
            statusCodeMap.defineStatusCode(0x00000400, 'ESME_TEST_STATUS', 'Test status code');
            expect(statusCodeMap.has(0x00000400)).to.be.true;
            expect(statusCodeMap.has('ESME_TEST_STATUS')).to.be.true;
            statusCodeMap.removeStatusCode(0x00000400);
            expect(statusCodeMap.has(0x00000400)).to.be.false;
            expect(statusCodeMap.has('ESME_TEST_STATUS')).to.be.false;
        });

        it('removeStatusCode must remove entry by name', () => {
            const statusCodeMap = new statusCodes.StatusCodeMap();
            statusCodeMap.defineStatusCode(0x00000400, 'ESME_TEST_STATUS', 'Test status code');
            expect(statusCodeMap.has(0x00000400)).to.be.true;
            expect(statusCodeMap.has('ESME_TEST_STATUS')).to.be.true;
            statusCodeMap.removeStatusCode('ESME_TEST_STATUS');
            expect(statusCodeMap.has(0x00000400)).to.be.false;
            expect(statusCodeMap.has('ESME_TEST_STATUS')).to.be.false;
        });

        it('removeStatusCode is a noop on consecutive calls', () => {
            const statusCodeMap = new statusCodes.StatusCodeMap();
            statusCodeMap.defineStatusCode(0x00000400, 'ESME_TEST_STATUS', 'Test status code');
            statusCodeMap.defineStatusCode(0x00000401, 'ESME_TEST_STATUS1', 'Test status code');
            expect(statusCodeMap.size).to.be.equal(4);
            statusCodeMap.removeStatusCode('ESME_TEST_STATUS');
            expect(statusCodeMap.size).to.be.equal(2);
            statusCodeMap.removeStatusCode('ESME_TEST_STATUS');
            expect(statusCodeMap.size).to.be.equal(2);
        });
    });
    describe('Specification defined status codes', () => {
        it('Each defined status must have required properties', () => {
            statusCodes.defaults.forEach((statusCode, key) => {
                expect(statusCode.tag).to.exist;
                expect(statusCode.name).to.not.be.empty;
                expect(statusCode.description).to.not.be.empty;
                expect(key).to.be.oneOf([statusCode.tag, statusCode.name]);
            });
        });

        it('Default set of status codes must be immutable', () => {
            expect(() => {
                statusCodes.defaults.defineStatusCode(0x00000400, 'ESME_TEST_STATUS', 'Test status code');
            }).to.throw(/immutable/);
            expect(() => statusCodes.defaults.removeStatusCode(0x00000000)).to.throw(/immutable/);
        });
    });
});
