'use strict';

// @TODO handle cases with alternative fixed sizes eg "1 or 4"

class TlvMap extends Map {
    /**
     * @param {integer} tag 2 octet unsigned integer parameter identificator
     * @param {string} name Parameter name
     * @param {object} opts
     * @param {integer} opts.minOctets Minimum allowed TLV value size in octets
     * @param {integer} opts.maxOctets Maximum allowed TLV value size in octets
     * @param {integer} opts.octets Exact allowed TLV value size in octets
     */
    defineTlv(tag, name, { octets, minOctets = 1, maxOctets = 65535, type = 'octets' } = {}) {
        if (this.has(tag) || this.has(name)) {
            const e = new Error('TLV with same tag or name is already defined');
            e.tlvTag = tag;
            e.tlvName = name;
            // trying to register existing tlv is a bug, throw
            throw e;
        }
        const tlv = Object.create(null);
        tlv.name = name;
        tlv.tag = tag;
        tlv.type = type;
        tlv.minOctets = minOctets;
        tlv.maxOctets = maxOctets;
        if (octets) {
            tlv.min = octets;
            tlv.max = octets;
        }

        this.set(tlv.tag, tlv);
        this.set(tlv.name, tlv);
    }

    removeTlv(tagOrName) {
        if (!this.has(tagOrName)) {
            return;
        }
        const tlv = this.get(tagOrName);
        this.delete(tlv.tag);
        this.delete(tlv.name);
    }
}
module.exports.TlvMap = TlvMap;

// TLVs defined by smpp v5 specification
const defaults = new TlvMap();
defaults.defineTlv(0x0005, 'dest_addr_subunit', { type: 'int', octets: 1 });
defaults.defineTlv(0x0006, 'dest_network_type', { type: 'int', octets: 1 });
defaults.defineTlv(0x0007, 'dest_bearer_type', { type: 'int', octets: 1 });
defaults.defineTlv(0x0008, 'dest_telematics_id', { type: 'int', octets: 2 });
defaults.defineTlv(0x000D, 'source_addr_subunit', { type: 'int', octets: 1 });
defaults.defineTlv(0x000E, 'source_network_type', { type: 'int', octets: 1 });
defaults.defineTlv(0x000F, 'source_bearer_type', { type: 'int', octets: 1 });
defaults.defineTlv(0x0010, 'source_telematics_id', { type: 'int', octets: 1 });
defaults.defineTlv(0x0017, 'qos_time_to_live', { type: 'int', octets: 4 });
defaults.defineTlv(0x0019, 'payload_type', { type: 'int', octets: 1 });
defaults.defineTlv(0x001E, 'receipted_message_id', { type: 'c-string', maxOctets: 65 });
defaults.defineTlv(0x0030, 'ms_msg_wait_facilities', { type: 'int', octets: 1 });
defaults.defineTlv(0x0201, 'privacy_indicator', { type: 'int', octets: 1 });
defaults.defineTlv(0x0202, 'source_subaddress', { type: 'octets', maxOctets: 23 });
defaults.defineTlv(0x0203, 'dest_subaddress', { type: 'octets', maxOctets: 23 });
defaults.defineTlv(0x0204, 'user_message_reference', { type: 'int', octets: 2 });
defaults.defineTlv(0x0205, 'user_response_code', { type: 'int', octets: 1 });
defaults.defineTlv(0x020A, 'source_port', { type: 'int', octets: 2 });
defaults.defineTlv(0x020B, 'destination_port', { type: 'int', octets: 2 });
defaults.defineTlv(0x020C, 'sar_msg_ref_num', { type: 'int', octets: 2 });
defaults.defineTlv(0x020D, 'language_indicator', { type: 'int', octets: 1 });
defaults.defineTlv(0x020E, 'sar_total_segments', { type: 'int', octets: 1 });
defaults.defineTlv(0x020F, 'sar_segment_seqnum', { type: 'int', octets: 1 });
defaults.defineTlv(0x0210, 'sc_interface_version', { type: 'int', octets: 1 });
defaults.defineTlv(0x0302, 'callback_num_pres_ind', { type: 'octets', octets: 1 });
defaults.defineTlv(0x0303, 'callback_num_atag', { type: 'octets', maxOctets: 65 });
defaults.defineTlv(0x0304, 'number_of_messages', { type: 'int', octets: 1 });
defaults.defineTlv(0x0381, 'callback_num', { type: 'octets', maxOctets: 19 });
defaults.defineTlv(0x0420, 'dpf_result', { type: 'int', octets: 1 });
defaults.defineTlv(0x0421, 'set_dpf', { type: 'int', octets: 1 });
defaults.defineTlv(0x0422, 'ms_availability_status', { type: 'int', octets: 1 });
defaults.defineTlv(0x0423, 'network_error_code', { type: 'octets', octets: 3 });
defaults.defineTlv(0x0424, 'message_payload', { type: 'string' });
defaults.defineTlv(0x0425, 'delivery_failure_reason', { type: 'int', octets: 1 });
defaults.defineTlv(0x0426, 'more_messages_to_send', { type: 'int', octets: 1 });
defaults.defineTlv(0x0427, 'message_state', { type: 'int', octets: 1 });
defaults.defineTlv(0x0501, 'ussd_service_op', { type: 'octets', octets: 1 });
defaults.defineTlv(0x1201, 'display_time', { type: 'int', octets: 1 });
defaults.defineTlv(0x1203, 'sms_signal', { type: 'int', octets: 2 });
defaults.defineTlv(0x1204, 'ms_validity', { type: 'int', octets: 1 });
defaults.defineTlv(0x1380, 'its_reply_type', { type: 'int', octets: 1 });
defaults.defineTlv(0x1383, 'its_session_info', { type: 'octets', octets: 2 });
defaults.defineTlv(0x001D, 'additional_status_info_text', { type: 'c-string', maxOctets: 256 });
defaults.defineTlv(0x130C, 'alert_on_message_delivery', { type: 'int', octets: 0 });

module.exports.defaults = defaults;
