async function initPageCustom() {
  try {
    // replace with your actual API URL
    const response = await fetch("https://api.srckat.me/v1/config");
    const data = await response.json();

    // pull out the unix timestamp
    const timestamp = data.config["owner"].age_unix;

    // convert unix timestamp (seconds) → JS Date (ms)
    const birthDate = new Date(timestamp * 1000);
    const now = new Date();

    // calculate age
    let age = now.getFullYear() - birthDate.getFullYear();
    const monthDiff = now.getMonth() - birthDate.getMonth();

    // adjust if birthday hasn’t happened yet this year
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthDate.getDate())) {
      age--;
    }

    //console.log(`Age: ${age}`);
    document.getElementById("lkat-name").innerHTML = data.config.owner.shortname;
    document.getElementById("lkat-age").innerHTML = age;
    document.getElementById("lkat-pronoun").innerHTML = data.config.owner.pronoun;
    document.getElementById("lkat-motd").innerHTML = data.config.katweb.motd;
  } catch (err) {
    console.error("Error fetching age:", err);
  }
}

initPageCustom();