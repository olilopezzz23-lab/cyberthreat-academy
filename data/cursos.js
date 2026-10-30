// Base de datos de Cursos - CyberThreat Academy
window.ACADEMY_DATA = {
  "academy_info": {
    "name": "CyberThreat Academy",
    "tagline": "Formación especializada en Ciberseguridad, OSINT y Threat Intelligence",
    "version": "1.0.0"
  },
  "courses": [
    {
      "id": "curso-principiante",
      "level": "Principiante",
      "badge_color": "emerald",
      "title": "Nivel 1: Fundamentos de Ciberseguridad & Huella Digital",
      "subtitle": "De cero a comprender cómo operan las redes, los atacantes y la autoprotección digital",
      "description": "Aprende los pilares esenciales de la seguridad de la información, el funcionamiento real de Internet, la terminal de comandos y las técnicas básicas de investigación de fuentes abiertas (OSINT) para auditar tu propia exposición.",
      "duration": "15 Horas",
      "modules_count": 4,
      "modules": [
        {
          "id": "m1-fundamentos",
          "title": "Módulo 1: Arquitectura de Redes y la Tríada CIA",
          "lessons": [
            {
              "id": "l1-1-triada-redes",
              "title": "1.1 Cómo funciona Internet y la Tríada de Seguridad",
              "duration": "25 min",
              "summary": "Aprende los principios de Confidencialidad, Integridad y Disponibilidad, y el flujo de paquetes en TCP/IP y DNS.",
              "theory": "### 1. La Tríada CIA: El núcleo de la seguridad\nEn cualquier auditoría o incidente de seguridad, todos los controles giran en torno a tres pilares fundamentales:\n\n* **Confidencialidad (C):** La información solo es accesible por las identidades autorizadas.\n* **Integridad (I):** Los datos no pueden ser manipulados ni alterados de forma no autorizada durante su almacenamiento o tránsito.\n* **Disponibilidad (A):** Los sistemas y servicios están accesibles cuando los usuarios autorizados los necesitan.\n\n---\n\n### 2. Anatomía de una conexión a Internet\nCuando escribes `https://ejemplo.com` en tu navegador, ocurren tres pasos clave:\n1. **Resolución DNS:** Obtiene la dirección IP numérica.\n2. **Handshake TCP (Three-way Handshake):** SYN, SYN-ACK y ACK.\n3. **Cifrado TLS/SSL (HTTPS):** Negociación criptográfica para proteger los datos en tránsito.",
              "lab": {
                "title": "Laboratorio Práctico: Inspección de Resolución DNS y Puertos",
                "objective": "Auditar la resolución DNS de un dominio y verificar puertos abiertos usando herramientas de consola de Windows/Linux.",
                "prerequisites": "Terminal PowerShell (Windows) o Bash (Linux). Sin necesidad de privilegios de administrador.",
                "steps": [
                  {
                    "step": 1,
                    "instruction": "Consultar los registros DNS y servidores de correo de un dominio objetivo.",
                    "command": "nslookup -type=any cloudflare.com",
                    "explanation": "nslookup interroga a tu servidor DNS local para obtener direcciones IPv4 (A), IPv6 (AAAA) y servidores de correo (MX)."
                  },
                  {
                    "step": 2,
                    "instruction": "Trazar la ruta de saltos de red hasta el servidor de destino.",
                    "command": "tracert 1.1.1.1",
                    "explanation": "Identifica cada router intermedio por el que pasan tus paquetes antes de llegar al destino."
                  },
                  {
                    "step": 3,
                    "instruction": "Verificar si el puerto HTTPS (443) responde en un servidor remoto.",
                    "command": "Test-NetConnection -ComputerName google.com -Port 443",
                    "explanation": "Comprueba el Three-Way Handshake TCP sin necesidad de instalar clientes pesados."
                  }
                ],
                "deliverable": "Captura de pantalla o registro del resultado de Test-NetConnection con 'TcpTestSucceeded : True'."
              },
              "terminal_sim": {
                "initial_text": "CyberLab v1.0 [Simulador de Red]\nEscribe 'help' o prueba los comandos del laboratorio (nslookup, test-port, traceroute)",
                "commands": {
                  "nslookup": "Servidor: 1.1.1.1\nAddress: 1.1.1.1#53\nRespuesta no autoritativa:\ncloudflare.com internet address = 104.16.132.229\ncloudflare.com mail exchanger = 10 aspmx.l.google.com.",
                  "test-port": "Conectando con google.com:443 [TCP]...\n[+] Handshake SYN completado con éxito.\n[+] TcpTestSucceeded: TRUE - Canal seguro abierto.",
                  "traceroute": "1  192.168.1.1 (Gateway Local) 1.2ms\n2  10.20.0.1 (ISP Core) 8.4ms\n3  1.1.1.1 (Cloudflare Edge) 12.1ms\n[+] Traza completada exitosamente."
                }
              },
              "quiz": [
                {
                  "question": "¿Cuál de los tres pilares de la tríada CIA se ve vulnerado directamente durante un ataque de denegación de servicio (DDoS)?",
                  "options": [
                    "Confidencialidad",
                    "Integridad",
                    "Disponibilidad",
                    "Autenticidad"
                  ],
                  "correctIndex": 2,
                  "explanation": "Un ataque DDoS satura intencionadamente los recursos del servidor para impedir que los usuarios legítimos puedan acceder, afectando la Disponibilidad (Availability)."
                },
                {
                  "question": "¿Qué paquete envía el servidor en el segundo paso del Three-Way Handshake de TCP?",
                  "options": [
                    "SYN",
                    "SYN-ACK",
                    "FIN-ACK",
                    "RST"
                  ],
                  "correctIndex": 1,
                  "explanation": "El servidor responde al cliente con un SYN-ACK confirmando la recepción del SYN inicial y solicitando su propia sincronización."
                }
              ],
              "video_script": {
                "title": "Guion de Vídeo: Cómo funciona Internet y la Tríada CIA",
                "target_duration": "3 - 5 Minutos",
                "scenes": [
                  {
                    "time": "00:00 - 00:30",
                    "visual": "Animación de un candado digital y un gráfico de la Tríada CIA (Confidencialidad, Integridad, Disponibilidad).",
                    "audio": "¿Alguna vez te has preguntado qué ocurre en el segundo exacto en que entras a tu banco o envías un mensaje privado? En este vídeo aprenderás los tres pilares inviolables de la ciberseguridad y cómo viajan tus datos por la red sin ser interceptados."
                  },
                  {
                    "time": "00:30 - 02:00",
                    "visual": "Diagrama de flujo animado: Navegador -> Servidor DNS -> Handshake TCP -> Túnel HTTPS.",
                    "audio": "Para entender cómo defenderte, primero debes comprender el camino que recorre un paquete. Cuando pides una web, tu ordenador no conoce nombres, solo números IP. El servidor DNS actúa como la libreta de contactos. Inmediatamente después, se realiza un saludo de 3 pasos: el famoso Handshake TCP. Si este canal no estuviese cifrado con TLS, cualquier persona conectada a tu misma red Wi-Fi podría leer tus contraseñas en texto plano."
                  },
                  {
                    "time": "02:00 - 03:00",
                    "visual": "Terminal ejecutando nslookup y Test-NetConnection con los resultados del laboratorio práctico.",
                    "audio": "Abre tu propia terminal y compruébalo tú mismo con el comando nslookup. En la siguiente clase, nos pondremos manos a la obra con Linux y los permisos de usuario."
                  }
                ]
              }
            },
            {
              "id": "l1-2-osint-basico",
              "title": "1.2 OSINT Básico: Huella Digital y Google Dorks",
              "duration": "30 min",
              "summary": "Aprende qué es la inteligencia de fuentes abiertas (OSINT) y cómo utilizar operadores avanzados de búsqueda para descubrir fugas de información.",
              "theory": "### 1. ¿Qué es OSINT?\n**OSINT (Open Source Intelligence)** es la disciplina de recopilar, correlacionar y analizar información públicamente accesible para generar inteligencia útil y procesable.\n\nLos atacantes utilizan OSINT durante la fase de **Reconocimiento Pasivo**: obtienen datos de la víctima sin enviar un solo paquete directo a sus servidores, haciendo que la investigación sea completamente indetectable.\n\n---\n\n### 2. Google Dorking (Búsqueda Avanzada)\nOperadores comunes:\n* `site:` Limita al dominio objetivo.\n* `filetype:` Filtra extensiones específicas (ej. pdf, doc, env).\n* `intitle:` Busca términos exactos en el título web.\n* `intext:` Filtra cadenas dentro del contenido.",
              "lab": {
                "title": "Laboratorio Práctico: Auditoría de Exposición Personal y Dorking Seguro",
                "objective": "Aprender a buscar filtraciones de credenciales y documentos expuestos en entornos de prueba autorizados.",
                "prerequisites": "Navegador web moderno.",
                "steps": [
                  {
                    "step": 1,
                    "instruction": "Comprobar si tu correo personal ha figurado en brechas de datos masivas.",
                    "command": "Visitar https://haveibeenpwned.com e introducir un correo de prueba.",
                    "explanation": "HaveIBeenPwned indexa miles de millones de cuentas comprometidas en filtraciones públicas de grandes servicios."
                  },
                  {
                    "step": 2,
                    "instruction": "Buscar archivos PDF expuestos en dominios educativos autorizados usando Google Dorks.",
                    "command": "site:edu.es filetype:pdf \"ciberseguridad\"",
                    "explanation": "Demuestra cómo filtrar documentación técnica pública de forma precisa y eficiente."
                  }
                ],
                "deliverable": "Un informe de 3 puntos resumiendo tu nivel de exposición digital detectado."
              },
              "terminal_sim": {
                "initial_text": "CyberLab OSINT Console\nEscribe 'dork-test' o 'check-breach' para probar simulaciones.",
                "commands": {
                  "dork-test": "[+] Ejecutando consulta simulada: site:target.com filetype:pdf 'confidential'\n[RESULTADO]:\n1. target.com/docs/annual_report_2025.pdf [200 OK]\n2. target.com/backup/policy_internal.pdf [200 OK]\n[!] Alerta: Se han detectado 2 documentos indexados en el buscador.",
                  "check-breach": "[+] Consultando base de datos de filtraciones simulada...\n[INFO]: usuario@ejemplo.com localizado en 2 brechas antiguas (2021 DataBreach, 2023 ComboList).\n[RECOMENDACIÓN]: Habilitar MFA FIDO2 y rotar claves maestras."
                }
              },
              "quiz": [
                {
                  "question": "¿Cuál es la principal característica del reconocimiento pasivo en OSINT?",
                  "options": [
                    "Requiere infectar el equipo de la víctima con malware",
                    "No interactúa directamente con los servidores de la víctima, por lo que no deja registros en sus firewalls",
                    "Siempre utiliza ataques de fuerza bruta",
                    "Es visible de inmediato para el equipo de Blue Team"
                  ],
                  "correctIndex": 1,
                  "explanation": "El reconocimiento pasivo consulta fuentes intermedias (motores de búsqueda, registros públicos de DNS, cachés) sin enviar paquetes directos a los sistemas del objetivo."
                }
              ],
              "video_script": {
                "title": "Guion de Vídeo: Cómo descubren tus datos con OSINT y Google Dorks",
                "target_duration": "3 Minutos",
                "scenes": [
                  {
                    "time": "00:00 - 00:40",
                    "visual": "Pantalla negra con código verde y titulares reales de filtraciones de datos.",
                    "audio": "¿Sabías que los ciberdelincuentes no necesitan hackear una empresa para obtener sus contraseñas? A menudo, los propios administradores las dejan expuestas en Internet por error. Hoy aprenderás cómo funciona el OSINT y los famosos Google Dorks."
                  },
                  {
                    "time": "00:40 - 02:00",
                    "visual": "Demostración de los operadores site: y filetype: en la barra de búsqueda de Google.",
                    "audio": "Google es mucho más que un buscador. Con comandos como 'filetype:pdf' o 'site:', puedes filtrar información con precisión quirúrgica. Veremos cómo auditar si tu propia organización está regalando datos confidenciales sin saberlo."
                  }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "id": "curso-intermedio",
      "level": "Intermedio",
      "badge_color": "amber",
      "title": "Nivel 2: Hacking Ético, OSINT & Detección de Amenazas",
      "subtitle": "Metodologías de intrusión ética, escaneo de superficies, phishing avanzado y vectores de malware",
      "description": "Da el salto práctico: aprende a utilizar herramientas de auditoría ofensiva como Nmap y Shodan, comprende cómo operan los ataques de Adversary-in-the-Middle (Evilginx) y cómo los equipos de defensa detectan y bloquean intrusiones.",
      "duration": "25 Horas",
      "modules_count": 5,
      "modules": [
        {
          "id": "m2-recon-ofensivo",
          "title": "Módulo 1: Escaneo de Superficie y Ataques de Credenciales",
          "lessons": [
            {
              "id": "l2-1-shodan-nmap",
              "title": "2.1 Reconocimiento de Superficie con Shodan y Nmap",
              "duration": "40 min",
              "summary": "Aprende la diferencia entre reconocimiento activo y pasivo a escala global, escaneo de banners y detección de servicios vulnerables.",
              "theory": "### 1. Shodan: El motor de búsqueda de dispositivos conectados\nShodan rastrea toda la dirección IPv4 global conectándose a puertos abiertos e indexando los banners de servicio (cabeceras SSH, servidores web, cámaras IP, SCADA).\n\nFiltros clave:\n* `port:3389` (RDP expuesto).\n* `org:\"NombreEntidad\"` (Rango de IPs de una entidad).\n* `product:\"Apache httpd\"` (Software específico).\n\n---\n\n### 2. Nmap: Escaneo Activo\nPermite auditar puertos con técnicas como SYN Stealth Scan (`-sS`), detección de versiones (`-sV`) y scripts NSE (`-sC`).",
              "lab": {
                "title": "Laboratorio Práctico: Auditoría de Red Local con Nmap en Entorno Controlado",
                "objective": "Escanear una máquina virtual local y generar un informe de puertos y servicios expuestos.",
                "prerequisites": "Kali Linux o máquina con Nmap instalado en red host-only.",
                "steps": [
                  {
                    "step": 1,
                    "instruction": "Descubrir equipos activos en el segmento local sin hacer ruido.",
                    "command": "nmap -sn 192.168.56.0/24",
                    "explanation": "Realiza un barrido Ping (ICMP + ARP en local) para listar IPs encendidas."
                  },
                  {
                    "step": 2,
                    "instruction": "Escanear los 100 puertos más comunes de la máquina objetivo.",
                    "command": "nmap -F -sV 192.168.56.101",
                    "explanation": "Descubre rápidamente si tiene puertos como 22 (SSH), 80 (HTTP) o 445 (SMB) con sus versiones."
                  }
                ],
                "deliverable": "Listado de puertos abiertos identificados con sus versiones de servicio y evaluación de riesgos."
              },
              "terminal_sim": {
                "initial_text": "CyberLab Kali Terminal [Nmap v7.94]\nPrueba: 'nmap -sn 10.0.0.0/24' o 'nmap -sV 10.0.0.15'",
                "commands": {
                  "nmap -sn 10.0.0.0/24": "Starting Nmap 7.94\nNmap scan report for 10.0.0.1 (Gateway)\nHost is up (0.0012s latency).\nNmap scan report for 10.0.0.15 (Target-Server)\nHost is up (0.0008s latency).\n2 hosts up scanned in 1.45 seconds.",
                  "nmap -sV 10.0.0.15": "PORT     STATE SERVICE VERSION\n22/tcp   open  ssh     OpenSSH 8.9p1 Ubuntu\n80/tcp   open  http    Apache httpd 2.4.52\n3306/tcp open  mysql   MySQL 8.0.35\nService Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel"
                }
              },
              "quiz": [
                {
                  "question": "¿Por qué el escaneo SYN (-sS) en Nmap se conoce popularmente como 'half-open scan'?",
                  "options": [
                    "Porque solo escanea la mitad de los puertos disponibles",
                    "Porque nunca completa el 3-way handshake de TCP: envía un paquete RST tan pronto recibe el SYN-ACK",
                    "Porque únicamente funciona sobre el protocolo UDP",
                    "Porque solo puede ser ejecutado por usuarios sin privilegios"
                  ],
                  "correctIndex": 1,
                  "explanation": "Al enviar un paquete RST inmediatamente tras recibir el SYN-ACK, la conexión TCP nunca se finaliza formalmente en la capa de aplicación."
                }
              ],
              "video_script": {
                "title": "Guion de Vídeo: Cómo los Hackers Descubren Servidores Expuestos con Shodan y Nmap",
                "target_duration": "4 Minutos",
                "scenes": [
                  {
                    "time": "00:00 - 00:45",
                    "visual": "Mapa mundial con puntos rojos parpadeantes representando puertos abiertos en Shodan.",
                    "audio": "Imagina un radar que escanea cada segundo todos los dispositivos conectados al planeta: desde cámaras de seguridad hasta servidores de bases de datos. Eso es Shodan. En este vídeo aprenderás cómo los atacantes mapean objetivos en segundos y cómo utilizar Nmap para auditar tus defensas."
                  },
                  {
                    "time": "00:45 - 02:30",
                    "visual": "Ejecución de Nmap en consola mostrando la detección de servicios y versiones vulnerables.",
                    "audio": "Cuando ejecutamos un escaneo de puertos con detección de versiones, no estamos buscando 'hacer daño', sino auditar qué puertas y ventanas hemos dejado abiertas al exterior."
                  }
                ]
              }
            },
            {
              "id": "l2-2-phishing-aitm",
              "title": "2.2 Phishing Moderno: AitM y Evasión de MFA (Evilginx)",
              "duration": "45 min",
              "summary": "Comprende cómo los proxies inversos interceptan tokens de sesión y cómo defender a la organización mediante claves de seguridad FIDO2.",
              "theory": "### 1. La muerte del Phishing tradicional\nEl phishing clásico basado en clonar una web ya no funciona ante el MFA (códigos OTP o Push).\n\n### 2. Ataques Adversary-in-the-Middle (AitM)\nHerramientas como **Evilginx** actúan como un Reverse Proxy intermedio en tiempo real entre la víctima y el servicio legítimo (M365, Google, GitHub). Cuando el usuario completa el MFA, el servidor legítimo genera la **cookie de sesión**, la cual es interceptada por el proxy atacante.",
              "lab": {
                "title": "Laboratorio Práctico: Análisis Forense de una Cookie de Sesión Robada",
                "objective": "Inspeccionar los atributos de seguridad de una cookie (HttpOnly, Secure, SameSite) y entender cómo viaja un token de sesión.",
                "prerequisites": "Navegador web con herramientas de desarrollador (F12).",
                "steps": [
                  {
                    "step": 1,
                    "instruction": "Abrir las herramientas de desarrollo en el navegador (F12) y dirigirse a la pestaña Application o Almacenamiento.",
                    "command": "Presionar F12 -> Pestaña Application -> Cookies",
                    "explanation": "Permite visualizar los tokens de sesión locales que autentican al usuario."
                  },
                  {
                    "step": 2,
                    "instruction": "Auditar los flags de seguridad de las cookies: HttpOnly y Secure.",
                    "command": "Verificar si la columna HttpOnly tiene un tick.",
                    "explanation": "El flag HttpOnly evita que scripts maliciosos de JavaScript (XSS) lean la cookie directamente."
                  }
                ],
                "deliverable": "Informe breve explicando la diferencia entre un código OTP y una cookie de sesión en un ataque AitM."
              },
              "terminal_sim": {
                "initial_text": "Evilginx / AitM Forensic Analyzer\nComandos: 'inspect-session' o 'check-fido2'",
                "commands": {
                  "inspect-session": "[!] Sesión interceptada detectada:\nUsuario: victim@empresa.com\nCookie Name: ESTSAUTH / ESTSAUTHPERSISTENT\nValor: eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIs...\nFlag HttpOnly: TRUE | Flag Secure: TRUE\n[ESTADO]: MFA superado por el atacante mediante robo de token.",
                  "check-fido2": "[+] Validando método de autenticación...\nProtocolo: WebAuthn / FIDO2 Level 2\nOrigin Domain: evil-proxy-login.com != microsoftonline.com\n[BLOQUEO EXITOSO]: La llave criptográfica rechazó firmar la solicitud. Ataque AitM mitigado."
                }
              },
              "quiz": [
                {
                  "question": "¿Qué elemento exacto captura un ataque AitM como Evilginx para saltarse la autenticación en dos pasos (MFA)?",
                  "options": [
                    "La dirección MAC física de la tarjeta de red de la víctima",
                    "La cookie o token de sesión autenticada emitida por el servidor legítimo",
                    "El número de teléfono móvil del usuario",
                    "El hash NTLM del controlador de dominio"
                  ],
                  "correctIndex": 1,
                  "explanation": "El atacante intercepta la cookie de sesión final que el servidor legítimo genera una vez validado el MFA, permitiéndole clonar la sesión activa."
                }
              ],
              "video_script": {
                "title": "Guion de Vídeo: Por qué el MFA de tu móvil ya no te protege (Evilginx & AitM)",
                "target_duration": "4 - 5 Minutos",
                "scenes": [
                  {
                    "time": "00:00 - 00:50",
                    "visual": "Animación de un usuario recibiendo un SMS de verificación mientras un atacante en la sombra entra a su cuenta sin contraseña.",
                    "audio": "¿Crees que tener activado el doble factor de autenticación te hace inmune a los hackers? Lamentablemente, ya no es así. Hoy en día los ciberdelincuentes utilizan técnicas de Adversary-in-the-Middle con herramientas como Evilginx para robar directamente tu sesión activa."
                  },
                  {
                    "time": "00:50 - 02:40",
                    "visual": "Diagrama secuencial animado mostrando el proxy intermediario capturando la cookie de sesión.",
                    "audio": "El atacante no adivina tu código: actúa como un espejo. Cuando introduces tus datos, él se los pasa al servidor real en tiempo real. Y cuando el servidor emite la cookie que dice 'este usuario ya está dentro', el atacante se la queda."
                  }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "id": "curso-profesional",
      "level": "Profesional",
      "badge_color": "indigo",
      "title": "Nivel 3: Threat Intelligence (CTI) & Operaciones Avanzadas",
      "subtitle": "Framework MITRE ATT&CK, gestión de IoCs, análisis de APTs, Threat Hunting y DFIR",
      "description": "Diseñado para analistas de SOC nivel 2/3, ingenieros de detección y consultores de Threat Intel. Domina la correlación de indicadores de compromiso, el análisis de comportamiento de grupos de amenaza persistente avanzada (APTs) y la respuesta a incidentes a escala corporativa.",
      "duration": "40 Horas",
      "modules_count": 6,
      "modules": [
        {
          "id": "m3-cti-core",
          "title": "Módulo 1: Fundamentos de CTI y el Framework MITRE ATT&CK",
          "lessons": [
            {
              "id": "l3-1-mitre-pyramid-pain",
              "title": "3.1 La Pirámide del Dolor de David Bianco y MITRE ATT&CK",
              "duration": "50 min",
              "summary": "Aprende a priorizar defensas detectando Tácticas, Técnicas y Procedimientos (TTPs) en lugar de simples hashes o direcciones IP volátiles.",
              "theory": "### 1. La Pirámide del Dolor (David Bianco)\n* Hashes: Dolor trivial para el adversario.\n* Direcciones IP y Dominios: Dolor simple/bajo.\n* Herramientas (Mimikatz, Cobalt Strike): Dolor difícil.\n* TTPs (Tácticas, Técnicas y Procedimientos): Dolor MÁXIMO.\n\n### 2. Estructura MITRE ATT&CK\n* Tácticas (El por qué): Initial Access, Persistence, Defense Evasion, Exfiltration.\n* Técnicas (El cómo): PowerShell (T1059.001), Process Injection (T1055).",
              "lab": {
                "title": "Laboratorio Práctico: Mapeo de un Informe de Incidente a la Matriz MITRE ATT&CK",
                "objective": "Leer un informe de telemetría de un ataque de ransomware real y extraer los IoCs y las técnicas TTP de MITRE ATT&CK correspondientes.",
                "prerequisites": "Acceso al navegador web y al portal https://attack.mitre.org",
                "steps": [
                  {
                    "step": 1,
                    "instruction": "Analizar la línea de comandos sospechosa detectada en telemetría.",
                    "command": "powershell.exe -enc JAB3AGMAIAA9ACAATgBlAHcALQBPAGIAagBlAGMAdAA...",
                    "explanation": "Identificar ejecución codificada con PowerShell."
                  },
                  {
                    "step": 2,
                    "instruction": "Mapear la técnica en la matriz ATT&CK.",
                    "command": "Identificar Técnica ID: T1059.001 (PowerShell) + T1027 (Obfuscated/Encoded Information)",
                    "explanation": "Correlacionar las acciones observadas en el host con el marco estándar de la industria."
                  }
                ],
                "deliverable": "Tabla con al menos 3 técnicas identificadas del ataque con sus IDs de MITRE y recomendaciones de mitigación."
              },
              "terminal_sim": {
                "initial_text": "Threat Intel Engine - MISP & MITRE Query CLI\nComandos: 'mitre-lookup T1059.001' o 'extract-iocs incident.log'",
                "commands": {
                  "mitre-lookup T1059.001": "[MITRE ATT&CK INFO]\nTécnica: T1059.001 (Command and Scripting Interpreter: PowerShell)\nTáctica: TA0002 (Execution)\nPlataformas: Windows\nMitigaciones: M1038 (Execution Prevention), M1042 (Disable or Remove Feature or Program)\nReglas Sigma recomendadas: proc_creation_win_powershell_base64_encoded",
                  "extract-iocs incident.log": "[+] Analizando telemetría del incidente...\n[IOCs Extraídos]:\n- SHA256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855\n- C2 IP: 185.220.101.5 (AS197695 - bulletproof hoster)\n- MITRE Technique: T1071.001 (Application Layer Protocol: Web Protocols)\n[NIVEL DE AMENAZA]: ALTO - Afiliado Ransomware detectado."
                }
              },
              "quiz": [
                {
                  "question": "Según la Pirámide del Dolor de David Bianco, ¿qué tipo de indicador causa el máximo impacto y dificultad a los adversarios si logramos detectarlo?",
                  "options": [
                    "Los hashes SHA256 de sus binarios maliciosos",
                    "Las direcciones IP de sus servidores Command & Control (C2)",
                    "Sus TTPs (Tácticas, Técnicas y Procedimientos)",
                    "Los registros MX de sus servidores de phishing"
                  ],
                  "correctIndex": 2,
                  "explanation": "Modificar un hash o una IP le cuesta segundos al atacante. En cambio, cambiar sus TTPs (su forma de actuar y sus herramientas metodológicas) le cuesta semanas o meses."
                }
              ],
              "video_script": {
                "title": "Guion de Vídeo: Cómo los Analistas de CTI Cazan Amenazas con la Pirámide del Dolor y MITRE ATT&CK",
                "target_duration": "5 Minutos",
                "scenes": [
                  {
                    "time": "00:00 - 01:00",
                    "visual": "Gráfico 3D de la Pirámide del Dolor con luces rojas en la cima (TTPs).",
                    "audio": "Si solo bloqueas direcciones IP y hashes de virus, siempre irás un paso por detrás de los cibercriminales. En el mundo profesional de la Inteligencia de Amenazas, aplicamos la Pirámide del Dolor y la matriz MITRE ATT&CK para golpear donde realmente les duele."
                  },
                  {
                    "time": "01:00 - 03:30",
                    "visual": "Navegación interactiva por la matriz MITRE ATT&CK mostrando cómo se reconstruye la cadena de ataque de un grupo APT.",
                    "audio": "MITRE ATT&CK es el lenguaje universal de la ciberseguridad. En esta lección aprenderás a deconstruir cualquier ciberataque en sus tácticas y técnicas fundamentales para entrenar a tus sistemas de detección."
                  }
                ]
              }
            }
          ]
        }
      ]
    }
  ]
};
