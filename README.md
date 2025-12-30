
📂 PROJECT: DOOMSDAY PROTOCOL
🛡️ S.H.I.E.L.D. Internal Database | Countdown System
This is a high-performance, single-page interface designed for the Avengers: Doomsday (2026) countdown. It utilizes a Stark Industries-inspired HUD (Heads-Up Display) aesthetic with real-time multiversal tracking.

🚀 Deployment Instructions
Since this project uses Tailwind CSS via CDN and Alpine.js, there is no complex installation required.

File Setup: Save your code as index.html.

Assets: Ensure you are connected to the internet (required to load the Marvel fonts and Tailwind utility engine).

Launch: Simply open index.html in any modern web browser (Chrome, Brave, or Edge recommended for best blur effects).

🛠️ Technical Specifications
Framework: Tailwind CSS (Styling)

Logic Engine: Alpine.js (Reactive Countdown)

Typography: Orbitron (Sci-Fi/Tech) & Rajdhani (Data/HUD)

Theme: Obsidian Black / Arc-Reactor Cyan / Danger Red

⚙️ Configuration (How to edit)
1. Changing the Target Date
To update the countdown for a different release or event, locate the <script> tag at the bottom of the file and edit this line:

JavaScript

targetDate: new Date('December 18, 2026 00:00:00'),
2. Updating Social Uplinks
The social media section on the left is currently linked to official Marvel accounts. To change these to your own community links, update the href attributes in the Social Uplink Section:

HTML
<a href="YOUR_LINK_HERE" target="_blank"> ... </a>

3. Adding More Trailers
To add a third or fourth trailer, copy one of the group relative div blocks inside the grid and paste it below. The grid will automatically adjust the layout.

🧬 System Features
Live Logic: Accurate Month/Day/Hour/Minute/Second calculation.

Glassmorphism: HUD-style blurred navigation and panels.

Responsive HUD: Custom clip-path polygons that maintain the "Stark Tech" look on mobile.

Interactive Archives: Hover-glow effects on all decrypted video intel (Trailers).

SECURITY NOTICE: This terminal is for authorized Avengers personnel only. Unauthorized access to the Doomsday Protocol will be met with immediate Stark Security intervention.<img width="1470" height="828" alt="Screenshot 2025-12-30 at 10 41 45 PM" src="https://github.com/user-attachments/assets/61096b6b-f3f8-491a-8e17-5a57cc95e5c4" />
<img width="1470" height="828" alt="Screenshot 2025-12-30 at 10 41 57 PM" src="https://github.com/user-attachments/assets/e2b2ed37-5cfe-451e-922a-07dd39a89812" />
