# Direct Airtel SIP Investigation Report

**Date**: 2026-08-20  
**Target**: Direct Cloud/Asterisk SIP Registration with Existing Airtel Residential Fiber Landline  
**Target Cost**: ₹0 Additional Hardware, 24/7 Cloud Operability (Vercel + Render + Supabase)

---

## 1. INVESTIGATION MATRIX & TECHNICAL REALITY

| Category | Finding / Specification | Verified Status |
| :--- | :--- | :---: |
| **Airtel VoIP Architecture** | Delivered via dedicated, isolated **Voice VLAN (e.g. VLAN 100/101)** over fiber. | ✅ **OFFICIALLY VERIFIED** |
| **SIP Registrar / Realm** | `ims.airtel.in` (Resolves only inside Airtel's private network). | ✅ **COMMUNITY & CARRIER VERIFIED** |
| **Private IP Network** | Airtel IMS operates on an internal unroutable **`10.x.x.x` / `100.x.x.x`** carrier subnet. | ✅ **VERIFIED** |
| **SIP Authentication** | Digest Authentication (`username@ims.airtel.in` + password) pre-provisioned via TR-069 into router flash. | ✅ **VERIFIED** |
| **Public Cloud Reachability (Render / Vercel)** | **UNREACHABLE DIRECTLY**: `ims.airtel.in` and its SBC IP addresses are strictly internal to Airtel's network and cannot be resolved or reached over the public Internet by AWS/Render/Cloudflare. | 🛑 **FATAL CLOUD BLOCKER** |

---

## 2. DETAILED BREAKDOWN OF ARCHITECTURAL CHALLENGES

### A. The Private Voice VLAN / Subnet Isolation
- When Airtel provisions your Fiber ONT, it creates two separate WAN interfaces:
  1. **Internet WAN (VLAN 100/PPP)**: Connects your home to the public Internet (Public IPv4/IPv6).
  2. **Voice WAN (VLAN 101/DHCP or Static)**: Connects solely to Airtel's internal IMS core (`10.x.x.x` subnet).
- Traffic sent to `ims.airtel.in` is routed **strictly through the Voice WAN interface**.
- Any request originating from outside the physical Airtel fiber line (such as a Render server in Frankfurt/Oregon or AWS Mumbai) is dropped by Airtel firewalls because the SIP core does not have public Internet gateways.

### B. Can the Airtel Router Act as a 24/7 Cloud Relay Without a PC?
- **Consumer ONT Limitations**: Standard Airtel ONTs (Nokia, Huawei, Sercomm, ZTE) run locked proprietary firmware.
- They **do NOT** support installing custom VPN servers (WireGuard/OpenVPN) or acting as SIP proxies to external public IPs.
- Therefore, to route traffic from Render into the Airtel Voice VLAN, an always-on physical gateway device on the local network would be required (violating the ₹0 / zero-running-PC constraint).

---

## 3. FINAL VERDICT & TECHNICAL BLOCKER

```text
================================================================================
FINAL VERDICT:
Can existing Airtel residential landline be used directly from Cloud (Render/Vercel)
without any local hardware or always-on PC at ₹0?

➔ NO (TECHNICALLY IMPOSSIBLE DUE TO AIRTEL IMS PRIVATE NETWORKING)
================================================================================
```

### Exact Technical Blockers:
1. **Private IMS Addressing**: Airtel's SIP servers (`ims.airtel.in` on `10.x.x.x`) do not exist on the public Internet. Render/Vercel cannot route SIP/RTP packets to an unroutable private ISP subnet.
2. **ISP Firmware Lock**: The Airtel consumer router cannot be configured as a cloud VPN bridge or SIP proxy without custom local hardware.
3. **24/7 Cloud Decoupling**: Because the residential landline is physically tethered to your fiber ONT at home, a pure cloud server (Render) cannot dial through that physical fiber line without either:
   - A local hardware device acting as a bridge, or
   - An authorized Cloud SIP Trunk (e.g. Airtel Business Cloud SIP or Exotel) designed for public cloud PBX integration.
