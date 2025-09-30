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
    document.getElementById("lkat-trusted").innerHTML = data.config.katweb.trusted;
    document.getElementById("lkat-favgame").innerHTML = data.config.katweb.favgame;
    document.getElementById("lkat-currproj").innerHTML = data.config.katweb.currproj;
    
    if (data.config.global_netvars.s_hgf) {
      document.getElementById("lkat-hgf").innerHTML = "Taken :3";
    } else {
      document.getElementById("lkat-hgf").innerHTML = "Single :[";
    }
  } catch (err) {
    console.error("Error fetching age:", err);
  }
}

initPageCustom();