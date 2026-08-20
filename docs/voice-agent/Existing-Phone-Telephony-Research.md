# Existing Phone Telephony & Cellular Bridge Research

**Date**: 2026-08-20  
**Project**: Rahnoxa Platform — Rishima AI Voice Agent  
**Constraint**: ₹0 Additional Hardware, No Rooting, Existing Devices Only

---

## 1. DEVICE CAPABILITY & TELEPHONY INTERACTION MATRIX

| Device | Interface | HFP (Call Audio) | Dial Control (AT/API) | Two-Way Audio to Linux | Root Required | Zero-Cost Usable? |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **Android Phone (Primary)** | **Bluetooth HFP** | ✅ (via BlueZ / PipeWire HFP HF role) | ✅ (AT+ATD / Android Telecom API) | ⚠️ Requires PipeWire/oFono HFP AG/HF pairing | ❌ NO | **YES (Theoretical Bridge)** |
| **Android Phone (Primary)** | **USB Serial / Modem** | ❌ (Blocked by Android OS) | ⚠️ (ADB only, no voice stream) | ❌ (Audio not on USB ACM) | ❌ NO | ❌ NO |
| **Jio Keypad Phone (KaiOS)**| **Bluetooth HFP** | ⚠️ Limited Profile Support | ❌ Firmware locked by Reliance Jio | ❌ (Carrier firmware locks voice bridging) | ❌ NO | ❌ NO |
| **Jio Keypad Phone (KaiOS)**| **USB Modem** | ❌ | ❌ (Locked CDC-ACM interface) | ❌ | ❌ NO | ❌ NO |
| **Lava Keypad Phone** | **Bluetooth HFP** | ⚠️ Headset client only | ❌ No open AT command port | ❌ (Audio locked to handset earpiece) | ❌ NO | ❌ NO |
| **Lava Keypad Phone** | **USB Serial** | ❌ (Mass storage only) | ❌ | ❌ | ❌ NO | ❌ NO |

---

## 2. DETAILED FINDINGS PER OPTION

### Option 1: Android Phone via Linux Bluetooth HFP (The Only Zero-Hardware Candidate)
- **Mechanism**: Linux acts as a Bluetooth "Hands-Free Unit" (HF) while the Android phone acts as the "Audio Gateway" (AG).
- **Control**: Linux sends AT commands (`ATD+91...;`, `ATH`) over the RFCOMM/HFP profile to instruct Android to place the call.
- **Audio**: SCO/eSCO bidirectional audio is routed through PipeWire / PulseAudio `bluez5` audio card.
- **Root Status**: **NO ROOT REQUIRED**. Android treats Linux exactly like a car dashboard / Bluetooth headset.
- **Host Requirement**: The Linux host machine MUST have a functional Bluetooth adapter. (Host inspection: `lsusb` shows no built-in Bluetooth HCI controller on this specific desktop motherboard; an existing Bluetooth USB dongle or laptop Bluetooth is required).

### Option 2: Jio Keypad Phone (KaiOS)
- **Status**: **FAILED FOR AI CALLING**.
- **Reason**: Reliance Jio locks the KaiOS Bluetooth stack to only allow pairing with Bluetooth earphones (A2DP / Headset Sink). It does NOT expose its internal modem AT command processor or allow external PC control of Voice-over-LTE (VoLTE) audio streams.

### Option 3: Lava Dual-SIM Keypad Phone
- **Status**: **FAILED FOR AI CALLING**.
- **Reason**: Basic MediaTek/Spreadtrum feature phone firmware does not support Bluetooth Audio Gateway (AG) mode to PC. USB connection only exposes Mass Storage / Flash tool mode, with no bidirectional audio streaming over USB.

---

## 3. HONEST CONCLUSION & VERDICT

1. **Keypad Phones**: Neither the JioPhone nor the Lava keypad phone can act as a programmatic two-way AI telephony bridge.
2. **Android Phone**: The non-rooted Android phone **CAN** theoretically act as a cellular bridge via Bluetooth HFP (treating PC as a Hands-Free car unit), **PROVIDED** the Linux computer has a Bluetooth radio adapter.
3. **Hardware Assessment**: If the current desktop PC does not have an active Bluetooth adapter, a physical telephone call cannot leave the machine without either:
   - Plugging in an existing Bluetooth dongle, or
   - Connecting an authorized cloud telecom bridge (e.g. Exotel trial or Bland API).
