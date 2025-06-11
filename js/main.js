const html = {
    input: document.querySelector('#ip-input'),
    button: document.querySelector('#locate-btn'),
    userInfo: document.querySelector('.user-information')
}

function locateUser() {
    html.userInfo.innerHTML = '';
    const url = `https://iplocate.io/api/lookup/${html.input.value}?apikey=6d9c98e5c9ec2c26a5736e1aefa1ee65`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Dirección IP no encontrada.')
            }
            return response.json()
        })
        .then(data => {
            console.log(data);
            html.userInfo.innerHTML = `
            <h2>La Dirección IP ${data.ip} está ubicada en ${data.country} (${data.country_code}).</h2>
            <h3>Continente ${data.continent}</h3>
            <h4>Subregión ${data.subdivision}</h4>
            <h5>${data.city} (Latitud ${data.latitude}, Longitud ${data.longitude})</h5>
            <div class="all-info">
                <div class="basic-info">
                    <p>${data.country} <b>${(data.is_eu) ? 'sí' : 'no'}</b> es parte de la Unión Europea.</p>
                    <p>El huso horario de ${data.city} es <b>${data.time_zone}</b>.</p>
                    <p>Para llamar a este país, marca <b>+${data.calling_code}.</b></p>
                    <p>Si tienes que pagar, en ${data.country} usan <b>${data.currency_code}</b>.</p>
                    <p>El Código Postal de esta IP es <b>${data.postal_code}</b>.</p>
                    <p>La IP ${data.ip} se encuentra dentro del rango CIDR <b>${data.network}</b>.</p>
                </div>
                <div class="asn-privacy">
                    <div class="asn-info">
                        <p><b>Sistema Autónomo:</b></p>
                        <ul>
                            <li>Número: ${data.asn.asn}</li>
                            <li>Rango CIDR: ${data.asn.route}</li>
                            <li>Nombre de red: ${data.asn.netname}</li>
                            <li>Código del país: ${data.asn.country_code}</li>
                            <li>Dominio: ${data.asn.domain}</li>
                            <li>Tipo de red: ${data.asn.type}</li>
                            <li>Registro Regional de Internet: ${data.asn.rir}</li>
                        </ul>
                    </div>
                    <div class="privacy-info">
                        <p><b>Información de privacidad:</b></p>
                        <ul>
                            <li>Esta IP <b>${(data.privacy.is_abuser) ? 'sí' : 'no'}</b> es maliciosa.</li>
                            <li>Esta IP <b>${(data.privacy.is_anonymous) ? 'sí' : 'no'}</b> es anónima.</li>
                            <li>Esta IP <b>${(data.privacy.is_bogon) ? 'no' : 'sí'}</b> está asignada oficialmente por ${data.asn.rir}.</li>
                            <li>Esta IP <b>${(data.privacy.is_hosting) ? 'sí' : 'no'}</b> es parte de un entorno de alojamiento web.</li>
                            <li>Esta IP <b>${(data.privacy.is_icloud_relay) ? 'sí' : 'no'}</b> está enmascarada por iCloud Private Relay.</li>
                            <li>Esta IP <b>${(data.privacy.is_proxy) ? 'sí' : 'no'}</b> actúa como proxy.</li>
                            <li>Esta IP <b>${(data.privacy.is_tor) ? 'sí' : 'no'}</b> está asociada a Tor.</li>
                            <li>Esta IP <b>${(data.privacy.is_vpn) ? 'sí' : 'no'}</b> proviene de un VPN comercial.</li>
                        </ul>
                    </div>
                </div>
                <div class="abuse-info">
                    <p>Si esta IP está siendo usada maliciosamente, contacta a ${data.abuse.name} (${data.abuse.country_code}) aquí:</p>
                    <ul>
                        <li><b>Dirección</b>: ${data.abuse.address}</li>
                        <li><b>Correo</b>: ${data.abuse.email}</li>
                        <li><b>Teléfono</b>: ${data.abuse.phone}</li>
                    </ul>
                </div>
            </div>
        `
        })
        .catch(error => {
            html.userInfo.innerHTML = `<p>${error.message}</p>`
        });
}

html.button.addEventListener('click', locateUser);
html.input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        locateUser();
    };
});