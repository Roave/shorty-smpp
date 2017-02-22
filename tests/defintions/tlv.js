'use strict';

const describe = require('mocha').describe;
const expect = require('chai').expect;
const it = require('mocha').it;
const tlv = require('../../lib/definitions/tlv');

describe('definitions/tlv', () => {
    describe('TlvMap', () => {
        it('defineTlv must add tlv to map under both tag and name', () => {
            const tlvMap = new tlv.TlvMap();
            tlvMap.defineTlv(0x1400, 'test_tlv');
            expect(tlvMap.has(0x1400)).to.be.true;
            expect(tlvMap.has('test_tlv')).to.be.true;
            expect(tlvMap.get(0x1400)).to.be.equal(tlvMap.get('test_tlv'));
        });

        it('defineTlv must add tlv to map with required properties', () => {
            const tlvMap = new tlv.TlvMap();
            tlvMap.defineTlv(0x1400, 'test_tlv', { type: 'octets', maxOctets: 255 });
            const definedTlv = tlvMap.get(0x1400);
            expect(definedTlv.tag).to.be.equal(0x1400);
            expect(definedTlv.name).to.be.equal('test_tlv');
            expect(definedTlv.type).to.be.equal('octets');
            expect(definedTlv.minOctets).to.be.equal(1);
            expect(definedTlv.maxOctets).to.be.equal(255);
        });

        it('defineTlv must throw on attempt to add tlv with existing tag', () => {
            const tlvMap = new tlv.TlvMap();
            tlvMap.defineTlv(0x1400, 'test_tlv');
            expect(() => tlvMap.defineTlv(0x1400, 'test_tlv1')).to.throw(/is already defined/);
        });

        it('defineTlv must throw on attempt to add tlv with existing name', () => {
            const tlvMap = new tlv.TlvMap();
            tlvMap.defineTlv(0x1400, 'test_tlv');
            expect(() => tlvMap.defineTlv(0x1401, 'test_tlv')).to.throw(/is already defined/);
        });

        it('removeTlv must remove entry by tag', () => {
            const tlvMap = new tlv.TlvMap();
            tlvMap.defineTlv(0x1400, 'test_tlv');
            expect(tlvMap.has(0x1400)).to.be.true;
            expect(tlvMap.has('test_tlv')).to.be.true;
            tlvMap.removeTlv(0x1400);
            expect(tlvMap.has(0x1400)).to.be.false;
            expect(tlvMap.has('test_tlv')).to.be.false;
        });

        it('removeTlv must remove entry by name', () => {
            const tlvMap = new tlv.TlvMap();
            tlvMap.defineTlv(0x1400, 'test_tlv');
            expect(tlvMap.has(0x1400)).to.be.true;
            expect(tlvMap.has('test_tlv')).to.be.true;
            tlvMap.removeTlv('test_tlv');
            expect(tlvMap.has(0x1400)).to.be.false;
            expect(tlvMap.has('test_tlv')).to.be.false;
        });

        it('removeTlv is a noop on consecutive calls', () => {
            const tlvMap = new tlv.TlvMap();
            tlvMap.defineTlv(0x1400, 'test_tlv');
            tlvMap.defineTlv(0x1401, 'test_tlv1');
            expect(tlvMap.size).to.be.equal(4);
            tlvMap.removeTlv('test_tlv');
            expect(tlvMap.size).to.be.equal(2);
            tlvMap.removeTlv('test_tlv');
            expect(tlvMap.size).to.be.equal(2);
        });
    });
    describe('Specification defined parameters', () => {
        it('Each defined tlv must have required properties', () => {
            tlv.defaults.forEach((tlvEntry, key) => {
                expect(tlvEntry.tag).to.not.be.empty;
                expect(tlvEntry.name).to.not.be.empty;
                expect(tlvEntry.type).to.not.be.empty;
                expect(tlvEntry.minOctets).to.not.be.empty;
                expect(tlvEntry.maxOctets).to.not.be.empty;
                expect(key).to.be.oneOf([tlvEntry.tag, tlvEntry.name]);
            });
        });

        it('Default set of TLVs must be immutable', () => {
            expect(() => tlv.defaults.defineTlv(0x1400, 'test_tlv')).to.throw(/immutable/);
            expect(() => tlv.defaults.removeTlv(0x0005)).to.throw(/immutable/);
        });
    });
});
