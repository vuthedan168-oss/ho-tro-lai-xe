/**
 * 🔑 HỆ THỐNG QUẢN LÝ BẢN QUYỀN DRIVEPASS PRO (Admin Key Generator)
 * Cấp mã bản quyền khóa 1 Thiết Bị & 1 Tài Khoản LMS
 */

const SECRET_SALT = "DRIVEPASS_PRO_SECRET_SALT_2026_HE_PRIVATE";

function simpleHash(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return ("00000000" + (h >>> 0).toString(16).toUpperCase()).slice(-8);
}

/**
 * Sinh mã License Key cấp cho khách hàng dựa trên Machine ID hiển thị trên widget
 * @param {string} machineId Mã thiết bị khách hàng gửi (Ví dụ: DP-8F3A-9B21)
 * @param {number} days Số ngày cấp (mặc định 365 ngày)
 */
function generateLicenseKey(machineId, days = 365) {
  const cleanId = (machineId || '').trim().toUpperCase();
  if (!cleanId) throw new Error("Machine ID không được để trống!");

  const expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + days);
  const expStr = expireDate.toISOString().split('T')[0]; // YYYY-MM-DD
  const expShort = expStr.replace(/-/g, '').slice(2); // YYMMDD

  const payload = cleanId + "|" + expStr + "|" + SECRET_SALT;
  const sigPart = simpleHash(payload);

  const key = `DPP-${cleanId.replace(/[^A-Z0-9]/g, '').slice(-4)}-${expShort}-${sigPart}`;
  return {
    machineId: cleanId,
    expiresAt: expStr,
    licenseKey: key
  };
}

/**
 * Kiểm tra tính hợp lệ của mã
 */
function verifyLicenseKey(machineId, key) {
  try {
    const parts = (key || '').trim().split('-');
    if (parts.length < 4 || parts[0] !== 'DPP') return { valid: false, reason: "Định dạng không đúng" };

    const expShort = parts[2]; // YYMMDD
    const sigPart = parts[3];
    const expStr = `20${expShort.slice(0, 2)}-${expShort.slice(2, 4)}-${expShort.slice(4, 6)}`;

    const today = new Date().toISOString().split('T')[0];
    if (today > expStr) return { valid: false, reason: "Mã bản quyền đã hết hạn" };

    const payload = machineId.trim().toUpperCase() + "|" + expStr + "|" + SECRET_SALT;
    const expectedSig = simpleHash(payload);

    if (sigPart !== expectedSig) return { valid: false, reason: "Mã không khớp thiết bị này" };

    return { valid: true, expiresAt: expStr };
  } catch (e) {
    return { valid: false, reason: e.message };
  }
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const testMachineId = args[0] || "DP-8F3A-9B21";
  const days = parseInt(args[1], 10) || 365;

  console.log("==================================================");
  console.log("⚡ DRIVEPASS PRO - ADMIN LICENSE GENERATOR");
  console.log("==================================================");
  const result = generateLicenseKey(testMachineId, days);
  console.log(`Mã thiết bị của khách  : ${result.machineId}`);
  console.log(`Hạn sử dụng             : ${result.expiresAt} (${days} ngày)`);
  console.log(`🔑 LICENSE KEY CẤP KHÁCH: ${result.licenseKey}`);
  console.log("--------------------------------------------------");
  const check = verifyLicenseKey(testMachineId, result.licenseKey);
  console.log(`Xác thực                : ${check.valid ? "HỢP LỆ (100% MATCH)" : "THẤT BẠI"}`);
  console.log("==================================================");
}

module.exports = { generateLicenseKey, verifyLicenseKey };
