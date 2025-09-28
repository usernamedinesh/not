// async export default getDeviceInfo() {
const getDeviceInfo = async () => {
    const ua = navigator.userAgent || "unknown";
    const platform = navigator.platform || "unknown";
    const language = navigator.language || "unknown";
    const timezone =
        Intl.DateTimeFormat().resolvedOptions().timeZone || "unknown";
    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;
    const touchPoints = navigator.maxTouchPoints || 0;
    const cores = navigator.hardwareConcurrency || null;
    const memory = navigator.deviceMemory || null; // approximate in GB
    const connection = navigator.connection
        ? {
              effectiveType: navigator.connection.effectiveType,
              downlink: navigator.connection.downlink,
          }
        : null;

    // Structured client hints (if supported)
    let clientHints = null;
    if (navigator.userAgentData) {
        clientHints = {
            brands: navigator.userAgentData.brands,
            mobile: navigator.userAgentData.mobile,
            platform: navigator.userAgentData.platform,
        };
    }

    // media devices (labels require permission)
    let devices = [];
    try {
        const list = await navigator.mediaDevices.enumerateDevices();
        devices = list.map((d) => ({
            kind: d.kind,
            label: d.label,
            deviceId: d.deviceId,
        }));
    } catch (err) {
        // permissions may be required to get device labels
    }

    return {
        ua,
        platform,
        language,
        timezone,
        screen: { width, height, dpr },
        touchPoints,
        cores,
        memory,
        connection,
        clientHints,
        devices,
    };
};

export default getDeviceInfo;
