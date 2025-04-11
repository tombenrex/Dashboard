<h1 align="center">Projekt: The Dashboard</h1> <h3 align="right">
:point_right:<a href="https://tombenrex.github.io/Dashboard/" target="blank">Live Server</a> :point_left:
</h3>

## Introduktion

Det här projektet är en modulär webapp som använder sig av JavaScript, HTML och CSS för att visa aktuell tid, väderprognoser, YouTube-videor, anteckningar, länk-kollektioner och dynamiska bakgrundsbilder via Unsplash. Projektet är uppdelat i flera olika JavaScript-filer för att hålla koden organiserad och lätt att underhålla.

### <strong>Jag har delat upp min kod i följande filer, där varje fil ansvarar för en specifik funktionalitet i appen:</strong>

1. <strong>main.js</strong> – Innehåller appens huvudlogik och kontrollflöde, hanterar interaktioner mellan olika moduler.

2. <strong>control.js</strong> – Hanterar kontrollflödet för appens olika moduler och funktioner.

3. <strong>editabletitle.js</strong> – Gör det möjligt att redigera och spara titeln på appens huvudsektioner.

4. <strong>links.js</strong> – Ansvarar för hantering av användarens länk-samlingar och visning.

5. <strong>notepad.js</strong> – Hanterar användarens anteckningar och sparar dessa till lokal lagring.

6. <strong>timedisplay.js</strong> – Visar aktuell tid och datum, uppdateras dynamiskt.

7. <strong>wallpaper.js</strong> – Hämtar och visar dynamiska bakgrundsbilder från Unsplash.

8. <strong>weather.js</strong> – Hämtar och visar väderdata från ett API.

9. <strong>youtube.js</strong> – Inbäddning och visning av YouTube-videor.

10. <strong>alert.js</strong> – Visar användarvänliga varnings- och felmeddelanden.

11. <strong>api.js</strong> – Ansvarar för alla API-anrop och datahantering från externa källor.

12. <strong>dom.js</strong> – Hanterar DOM-manipulering och interaktion med användaren.

13. <strong>helper.js</strong> – Innehåller hjälpfunktioner som används av flera moduler för att hålla koden DRY (Don't Repeat Yourself).

14. <strong>state.js</strong> – Hanterar appens tillstånd och användardata mellan olika moduler.

## Mina styrkor

Modularisering: Genom att dela upp appen i separata, självständiga filer har jag hållit koden organiserad och lätt att underhålla. Varje fil har ett tydligt ansvarsområde, vilket gör det enklare att hitta och rätta till buggar eller förbättra funktionalitet.

Central kontroll: main.js fungerar som en central kontroll för appen och hanterar interaktionen mellan olika moduler, vilket gör det möjligt att koordinera flödet mellan funktionerna på ett effektivt sätt.

Återanvändbarhet och Skalbarhet: Moduler som api.js och helper.js kan återanvändas i andra projekt utan att behöva modifieras, vilket gör appen flexibel och skalbar.

Felhantering och användarvänlighet: Med hjälp av alert.js har jag försökt säkerställa att användaren får tydliga felmeddelanden vid problem, vilket förbättrar användarupplevelsen.

Separering av logik och presentation: Jag har gjort ett medvetet val att separera logiken (som API-anrop i weather.js och api.js) från presentationen (t.ex. DOM-manipulation i dom.js), vilket gör det lättare att testa och utveckla varje del utan att påverka resten av appen.

## Brister

Prestanda: Det finns rum för förbättring vad gäller prestanda, särskilt när det gäller hämtning och visning av bakgrundsbilder i wallpaper.js. För att förbättra prestandan kan jag implementera tekniker som lazy loading eller cachning av bilder.

Felhantering i API-anrop: Jag har inte implementerat tillräcklig felhantering i alla API-anrop, särskilt i weather.js och api.js. Om en API-tjänst är nere eller om användaren har problem med internetuppkopplingen, bör jag ge användaren mer information om problemet och inte bara låta funktionen misslyckas utan feedback.

Responsivitet: Även om layouten är hyfsat responsiv finns det vissa delar av gränssnittet som inte är optimalt anpassade för mindre enheter. Jag kan förbättra CSS och även lägga till mediequeries för att förbättra användarupplevelsen på alla enheter.

En stor brist som inte håller i längden av hantering av nycklar. Just nu kan man inte se API nycklarna men anger man lösenordet så får man tillgång till samtliga nycklar. Detta var bara en temporär lösning då jag inte har kunskapen om att "gömma" nycklar. Lösenordet är inte heller krypterat vilket är en säkerhetsaspekt.

Koden skulle kunna vara mer kommenterad för att göra det lättare för andra att förstå hur olika moduler samverkar. Även om jag har försökt hålla koden ren, saknas det detaljerad dokumentation om varje modul och dess funktion.

## Slutsats

Sammanfattningsvis tycker jag att koden är funktionell och relativt välstrukturerad, men det finns förbättringsområden. Prestandaoptimeringar, felhantering och responsiv design skulle kunna göras bättre. Jag ser detta som ett pågående lärande där jag kan förbättra både tekniska och praktiska aspekter av utvecklingen. Jag är långt i från nöjd med slutresultatet men känner att det går framåt i den personliga utveckligen.
