import os
import re

# Load new header and footer inner content (without the wrapping tags)
with open('new_header.html', 'r', encoding='utf-8') as f:
    new_header_content = f.read().strip()

with open('new_footer.html', 'r', encoding='utf-8') as f:
    new_footer_content = f.read().strip()

# Regex patterns
# Header: match opening tag starting with <header class= (any value/quotes), capture inner content, then closing </header>
header_pattern = re.compile(
    r'(<header\s+class=[\'"].*?[\'"].*?>)(.*?)(</header>)',
    re.DOTALL | re.IGNORECASE
)

# Footer: same as before (if you want, you can make footer pattern more flexible too)
footer_pattern = re.compile(
    r'(<footer\s+class=[\'"].*?[\'"].*?>)(.*?)(</footer>)',
    re.DOTALL | re.IGNORECASE
)

def replace_section(content, pattern, replacement_content, section_name):
    updated = False

    def repl(match):
        nonlocal updated
        updated = True
        start_tag = match.group(1)
        end_tag = match.group(3)
        return f"{start_tag}\n{replacement_content}\n{end_tag}"

    new_content = pattern.sub(repl, content)
    return new_content, updated

def process_html_file(filepath):
    print(f"Processing file: {filepath}")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content, header_updated = replace_section(content, header_pattern, new_header_content, "Header")
    new_content, footer_updated = replace_section(new_content, footer_pattern, new_footer_content, "Footer")

    if header_updated or footer_updated:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"  Updated sections in {filepath}: "
              f"{'Header' if header_updated else ''}"
              f"{' and ' if header_updated and footer_updated else ''}"
              f"{'Footer' if footer_updated else ''}")
    else:
        print(f"  No header/footer sections found or no updates needed in {filepath}")

def scan_and_update_html_files(root_dir):
    for dirpath, _, filenames in os.walk(root_dir):
        for filename in filenames:
            if filename.lower().endswith('.html'):
                filepath = os.path.join(dirpath, filename)
                process_html_file(filepath)

if __name__ == "__main__":
    root_directory = '.'  # Change if needed
    scan_and_update_html_files(root_directory)
    print("Header and footer update complete.")