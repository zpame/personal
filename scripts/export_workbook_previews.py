import datetime
import html
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path


ASSETS = Path(__file__).resolve().parents[1] / "public" / "assets"
NAMESPACE = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}


def read_rows(workbook_path):
    with zipfile.ZipFile(workbook_path) as workbook:
        shared_strings = []
        if "xl/sharedStrings.xml" in workbook.namelist():
            root = ET.fromstring(workbook.read("xl/sharedStrings.xml"))
            shared_strings = [
                "".join(node.text or "" for node in item.findall(".//m:t", NAMESPACE))
                for item in root.findall("m:si", NAMESPACE)
            ]

        sheet = ET.fromstring(workbook.read("xl/worksheets/sheet1.xml"))
        rows = []
        total_hours = 0.0
        sheet_total_hours = None
        for row in sheet.findall(".//m:sheetData/m:row", NAMESPACE):
            values = {}
            for cell in row.findall("m:c", NAMESPACE):
                reference = cell.get("r", "")
                column = "".join(character for character in reference if character.isalpha())
                value = cell.find("m:v", NAMESPACE)

                if cell.get("t") == "inlineStr":
                    text = "".join(
                        node.text or "" for node in cell.findall(".//m:t", NAMESPACE)
                    )
                elif value is None:
                    text = ""
                elif cell.get("t") == "s":
                    text = shared_strings[int(value.text)]
                else:
                    text = value.text or ""
                    if column == "A":
                        try:
                            serial_date = float(text)
                            if 30000 < serial_date < 60000:
                                date = datetime.datetime(1899, 12, 30) + datetime.timedelta(
                                    days=serial_date
                                )
                                text = date.strftime("%B %d, %Y").replace(" 0", " ")
                        except ValueError:
                            pass

                values[column] = text

            if any(values.values()):
                try:
                    hours = float(values.get("C", ""))
                except ValueError:
                    hours = None

                row_label = " ".join(values.get(column, "") for column in ("A", "B"))
                if "total hours" in row_label.casefold():
                    sheet_total_hours = hours
                    continue

                rows.append(values)
                if hours is not None:
                    total_hours += hours

        if sheet_total_hours is not None:
            total_hours = sheet_total_hours

    return rows, total_hours


def create_preview(workbook_name, title, preview_name):
    rows, total_hours = read_rows(ASSETS / workbook_name)
    if not rows:
        raise ValueError(f"No sheet data found in {workbook_name}")

    columns = ("A", "B", "C")
    headers = [rows[0].get(column, "") for column in columns]
    table_rows = []
    for row in rows[1:]:
        if any(row.values()):
            cells = "".join(
                f"<td>{html.escape(row.get(column, ''))}</td>" for column in columns
            )
            table_rows.append(f"<tr>{cells}</tr>")

    header_cells = "".join(
        f'<th scope="col">{html.escape(value)}</th>' for value in headers
    )
    entry_count = len(table_rows)
    markup = f'''<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{html.escape(title)} Development Log</title>
    <style>
        :root {{ color-scheme: light; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #252b2c; background: #fff; }}
        * {{ box-sizing: border-box; }}
        body {{ margin: 0; padding: 18px; font-size: 14px; }}
        header {{ display: flex; flex-wrap: wrap; align-items: end; justify-content: space-between; gap: 12px 24px; padding-bottom: 14px; border-bottom: 1px solid #d8dedb; }}
        h1 {{ margin: 0; font-size: 19px; }}
        .summary {{ margin: 5px 0 0; color: #606967; }}
        label {{ display: grid; gap: 5px; color: #454d4a; font-size: 12px; font-weight: 600; }}
        input {{ width: min(300px, 70vw); min-height: 38px; padding: 8px 10px; border: 1px solid #b9c2bf; border-radius: 3px; font: inherit; }}
        .status {{ min-height: 20px; margin: 10px 0 6px; color: #606967; font-size: 12px; }}
        .table-wrap {{ max-height: calc(100vh - 130px); overflow: auto; border: 1px solid #d8dedb; }}
        table {{ width: 100%; border-collapse: collapse; table-layout: fixed; }}
        th, td {{ padding: 9px 10px; border-bottom: 1px solid #e3e7e5; text-align: left; vertical-align: top; }}
        th {{ position: sticky; top: 0; z-index: 1; background: #f3f5f4; color: #313937; font-size: 12px; }}
        th:nth-child(1), td:nth-child(1) {{ width: 21%; }}
        th:nth-child(2), td:nth-child(2) {{ width: 64%; overflow-wrap: anywhere; }}
        th:nth-child(3), td:nth-child(3) {{ width: 15%; text-align: right; white-space: nowrap; }}
        tbody tr:nth-child(even) {{ background: #fafbfa; }}
        tbody tr:last-child td {{ border-bottom: 0; }}
        @media (max-width: 560px) {{ body {{ padding: 12px; }} table {{ min-width: 560px; }} .table-wrap {{ max-height: calc(100vh - 145px); }} }}
    </style>
</head>
<body>
    <header>
        <div><h1>{html.escape(title)} Development Log</h1><p class="summary">{entry_count} entries · {total_hours:,.1f} hours logged</p></div>
        <label for="log-filter">Search entries<input id="log-filter" type="search" placeholder="Date or keyword"></label>
    </header>
    <p class="status" id="result-count" aria-live="polite">Showing {entry_count} entries</p>
    <div class="table-wrap"><table><thead><tr>{header_cells}</tr></thead><tbody>{"".join(table_rows)}</tbody></table></div>
    <script>
        const filter = document.querySelector("#log-filter");
        const tableRows = [...document.querySelectorAll("tbody tr")];
        const resultCount = document.querySelector("#result-count");
        filter.addEventListener("input", () => {{
            const query = filter.value.trim().toLowerCase();
            let visible = 0;
            for (const row of tableRows) {{
                const matches = row.textContent.toLowerCase().includes(query);
                row.hidden = !matches;
                if (matches) visible++;
            }}
            resultCount.textContent = `Showing ${{visible}} of ${{tableRows.length}} entries`;
        }});
    </script>
</body>
</html>
'''
    (ASSETS / preview_name).write_text(markup, encoding="utf-8")
    print(f"{preview_name}: {entry_count} entries, {total_hours:.1f} hours")


create_preview("Isolation Gamedev Log.xlsx", "Isolation", "isolation-log-preview.html")
create_preview("Magic Clicker Gamedev Log.xlsx", "Magic Clicker", "magic-clicker-log-preview.html")