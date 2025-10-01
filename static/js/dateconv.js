function getReadableTime(timestamp) {
    let date = new Date(timestamp * 1000);

    let formatted = date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    return formatted; 
// Example output: "2025-10-01 15:30:00"
}