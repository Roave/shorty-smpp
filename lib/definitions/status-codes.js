'use strict';

class StatusCodeMap extends Map {
    /**
     * @param {integer} tag 4 octet unsigned integer status code
     * @param {string} name Parameter name
     */
    defineStatusCode(tag, name, description) {
        if (this.has(tag) || this.has(name)) {
            const e = new Error('Status code with same tag or name is already defined');
            e.tlvTag = tag;
            e.tlvName = name;
            // trying to register existing tlv is a bug, throw
            throw e;
        }
        const statusCode = Object.create(null);
        // make sure tag is unsigned
        statusCode.tag = tag >>> 0;
        statusCode.name = name;
        statusCode.description = description;

        Object.freeze(statusCode);
        this.set(statusCode.tag, statusCode);
        this.set(statusCode.name, statusCode);
    }

    removeStatusCode(tagOrName) {
        if (!this.has(tagOrName)) {
            return;
        }
        const statusCode = this.get(tagOrName);
        this.delete(statusCode.tag);
        this.delete(statusCode.name);
    }
}
exports.StatusCodeMap = StatusCodeMap;

const defaults = new StatusCodeMap();

defaults.defineStatusCode(0x00000000, 'ESME_ROK', 'No Error');
defaults.defineStatusCode(0x00000001, 'ESME_RINVMSGLEN', 'Invalid message length');
defaults.defineStatusCode(0x00000002, 'ESME_RINVCMDLEN', 'Invalid command length');
defaults.defineStatusCode(0x00000003, 'ESME_RINVCMDID', 'Invalid command ID');
defaults.defineStatusCode(0x00000004, 'ESME_RINVBNDSTS', 'Incorrect bind status for given command');
defaults.defineStatusCode(0x00000005, 'ESME_RALYBND', 'ESME already in bound state');
defaults.defineStatusCode(0x00000006, 'ESME_RINVPRTFLG', 'Invalid priority flag');
defaults.defineStatusCode(0x00000007, 'ESME_RINVREGDLVFLG', 'Invalid registered delivery flag');
defaults.defineStatusCode(0x00000008, 'ESME_RSYSERR', 'System error');
defaults.defineStatusCode(0x0000000A, 'ESME_RINVSRCADR', 'Invalid source address');
defaults.defineStatusCode(0x0000000B, 'ESME_RINVDSTADR', 'Invalid destination address');
defaults.defineStatusCode(0x0000000C, 'ESME_RINVMSGID', 'Invalid message ID');
defaults.defineStatusCode(0x0000000D, 'ESME_RBINDFAIL', 'Bind failed');
defaults.defineStatusCode(0x0000000E, 'ESME_RINVPASWD', 'Invalid password');
defaults.defineStatusCode(0x0000000F, 'ESME_RINVSYSID', 'Invalid system ID');
defaults.defineStatusCode(0x00000011, 'ESME_RCANCELFAIL', 'Cancel SM failed');
defaults.defineStatusCode(0x00000013, 'ESME_RREPLACEFAIL', 'Replace SM failed');
defaults.defineStatusCode(0x00000014, 'ESME_RMSGQFUL', 'Message queue full');
defaults.defineStatusCode(0x00000015, 'ESME_RINVSERTYP', 'Invalid service type');
defaults.defineStatusCode(0x00000033, 'ESME_RINVNUMDESTS', 'Invalid number of destinations');
defaults.defineStatusCode(0x00000034, 'ESME_RINVDLNAME', 'Invalid distribution list name');
defaults.defineStatusCode(0x00000040, 'ESME_RINVDESTFLAG', 'Invalid destination flag');
defaults.defineStatusCode(0x00000042, 'ESME_RINVSUBREP', "Invalid 'submit with replace' request");
defaults.defineStatusCode(0x00000043, 'ESME_RINVESMCLASS', 'Invalid esm_class field');
defaults.defineStatusCode(0x00000044, 'ESME_RCNTSUBDL', 'Cannot submit to distribution list');
defaults.defineStatusCode(0x00000045, 'ESME_RSUBMITFAIL', 'submit_sm or submit_multi failed');
defaults.defineStatusCode(0x00000048, 'ESME_RINVSRCTON', 'Invalid source address TON');
defaults.defineStatusCode(0x00000049, 'ESME_RINVSRCNPI', 'Invalid source address NPI');
defaults.defineStatusCode(0x00000050, 'ESME_RINVDSTTON', 'Invalid destination address TON');
defaults.defineStatusCode(0x00000051, 'ESME_RINVDSTNPI', 'Invalid destination address NPI');
defaults.defineStatusCode(0x00000053, 'ESME_RINVSYSTYP', 'Invalid system type');
defaults.defineStatusCode(0x00000054, 'ESME_RINVREPFLAG', 'Invalid replace_if_present flag');
defaults.defineStatusCode(0x00000055, 'ESME_RINVNUMMSGS', 'Invalid number of messages');
defaults.defineStatusCode(0x00000058, 'ESME_RTHROTTLED', 'Throttling error');
defaults.defineStatusCode(0x00000061, 'ESME_RINVSCHED', 'Invalid scheduled delivery time');
defaults.defineStatusCode(0x00000062, 'ESME_RINVEXPIRY', 'Invalid message validity period');
defaults.defineStatusCode(0x00000063, 'ESME_RINVDFTMSGID', 'Predefined message invalid or not found');
defaults.defineStatusCode(0x00000064, 'ESME_RX_T_APPN', 'ESME receiver temporary app error code');
defaults.defineStatusCode(0x00000065, 'ESME_RX_P_APPN', 'ESME receiver permanent app error code');
defaults.defineStatusCode(0x00000066, 'ESME_RX_R_APPN', 'ESME receiver reject message error code');
defaults.defineStatusCode(0x00000067, 'ESME_RQUERYFAIL', 'query_sm request failed');
defaults.defineStatusCode(0x000000C0, 'ESME_RINVOPTPARSTREAM', 'Error in optional part of PDU body');
defaults.defineStatusCode(0x000000C1, 'ESME_ROPTPARNOTALLWD', 'Optional parameter not allowed');
defaults.defineStatusCode(0x000000C2, 'ESME_RINVPARLEN', 'Invalid parameter length');
defaults.defineStatusCode(0x000000C3, 'ESME_RMISSINGOPTPARAM', 'Expected optional parameter missing');
defaults.defineStatusCode(0x000000C4, 'ESME_RINVOPTPARAMVAL', 'Invalid optional parameter value');
defaults.defineStatusCode(0x000000FE, 'ESME_RDELIVERYFAILURE', 'Transaction Delivery Failure');
defaults.defineStatusCode(0x000000FF, 'ESME_RUNKNOWNERR', 'Unknown error');
defaults.defineStatusCode(0x00000100, 'ESME_RSERTYPUNAUTH', 'ESME Not authorised to use specified service_type');
defaults.defineStatusCode(0x00000101, 'ESME_RPROHIBITED', 'ESME Prohibited from using specified operation');
defaults.defineStatusCode(0x00000102, 'ESME_RSERTYPUNAVAIL', 'Specified service_type is unavailable');
defaults.defineStatusCode(0x00000103, 'ESME_RSERTYPDENIED', 'Specified service_type is denied');
defaults.defineStatusCode(0x00000104, 'ESME_RINVDCS', 'Invalid Data Coding Scheme');
defaults.defineStatusCode(0x00000105, 'ESME_RINVSRCADDRSUBUNIT', 'Source Address Sub unit is Invalid');
defaults.defineStatusCode(0x00000106, 'ESME_RINVDSTADDRSUBUNIT', 'Destination Address Sub unit is Invalid');
defaults.defineStatusCode(0x00000107, 'ESME_RINVBCASTFREQINT', 'Broadcast Frequency Interval is invalid');
defaults.defineStatusCode(0x00000108, 'ESME_RINVBCASTALIAS_NAME', 'Broadcast Alias Name is invalid');
defaults.defineStatusCode(0x00000109, 'ESME_RINVBCASTAREAFMT', 'Broadcast Area Format is invalid');
defaults.defineStatusCode(0x0000010A, 'ESME_RINVNUMBCAST_AREAS', 'Number of Broadcast Areas is invalid');
defaults.defineStatusCode(0x0000010B, 'ESME_RINVBCASTCNTTYPE', 'Broadcast Content Type is invalid');
defaults.defineStatusCode(0x0000010C, 'ESME_RINVBCASTMSGCLASS', 'Broadcast Message Class is invalid');
defaults.defineStatusCode(0x0000010D, 'ESME_RBCASTFAIL', 'broadcast_sm operation failed');
defaults.defineStatusCode(0x0000010E, 'ESME_RBCASTQUERYFAIL', 'query_broadcast_sm operation failed');
defaults.defineStatusCode(0x0000010F, 'ESME_RBCASTCANCELFAIL', 'cancel_broadcast_sm operation failed');
defaults.defineStatusCode(0x00000110, 'ESME_RINVBCAST_REP', 'Number of Repeated Broadcasts is invalid');
defaults.defineStatusCode(0x00000111, 'ESME_RINVBCASTSRVGRP', 'Broadcast Service Group is invalid');
defaults.defineStatusCode(0x00000112, 'ESME_RINVBCASTCHANIND', 'Broadcast Channel Indicator is invalid');

// disable defaults modification
defaults.set = () => {
    throw new Error('Default Status codes are immutable');
};
defaults.delete = defaults.set;
exports.defaults = defaults;
