from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:4173"
OUT = Path("/Users/USER/Documents/Codex/2026-07-17/files-mentioned-by-the-user-build/outputs/mindloop/qa")
OUT.mkdir(parents=True, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(
        headless=True,
        executable_path="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    )
    desktop = browser.new_page(viewport={"width": 1440, "height": 1000}, device_scale_factor=1)
    console_errors = []
    failed_responses = []
    desktop.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
    desktop.on("response", lambda response: failed_responses.append(f"{response.status} {response.url}") if response.status >= 400 else None)
    desktop.goto(BASE, wait_until="domcontentloaded", timeout=30000)
    desktop.get_by_role("heading", name="Get Inspired with Us").wait_for()
    desktop.wait_for_timeout(2500)
    assert desktop.locator("h1").count() == 1
    assert desktop.get_by_role("button", name="SUBSCRIBE").is_visible()
    desktop.locator("#hero-email").fill("not-an-email")
    desktop.get_by_role("button", name="SUBSCRIBE").click()
    assert "valid email" in desktop.locator("#email-message").inner_text()
    desktop.locator("#hero-email").fill("[REDACTED_EMAIL]")
    desktop.get_by_role("button", name="SUBSCRIBE").click()
    assert "on the list" in desktop.locator("#email-message").inner_text()
    desktop.locator("#how-it-works").scroll_into_view_if_needed()
    desktop.wait_for_timeout(1200)
    assert desktop.get_by_role("heading", name="Search has changed. Have you?").is_visible()
    desktop.locator("#how-it-works").screenshot(path=str(OUT / "search-section.png"))
    desktop.locator("#use-cases").scroll_into_view_if_needed()
    desktop.wait_for_timeout(1200)
    assert desktop.get_by_role("heading", name="The platform for meaningful content").is_visible()
    desktop.locator("#use-cases").screenshot(path=str(OUT / "solution-section.png"))
    desktop.screenshot(path=str(OUT / "desktop.png"), full_page=True)

    mobile = browser.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=1)
    mobile.goto(BASE, wait_until="domcontentloaded", timeout=30000)
    mobile.get_by_role("heading", name="Get Inspired with Us").wait_for()
    mobile.wait_for_timeout(1500)
    assert mobile.evaluate("document.documentElement.scrollWidth <= document.documentElement.clientWidth")
    assert mobile.get_by_role("heading", name="Get Inspired with Us").is_visible()
    mobile.screenshot(path=str(OUT / "mobile.png"), full_page=True)

    reduced = browser.new_page(viewport={"width": 1280, "height": 800}, reduced_motion="reduce")
    reduced.goto(BASE, wait_until="domcontentloaded", timeout=30000)
    reduced.get_by_role("heading", name="Get Inspired with Us").wait_for()
    assert reduced.get_by_role("heading", name="Get Inspired with Us").is_visible()
    reduced.screenshot(path=str(OUT / "reduced-motion.png"))

    not_found = browser.new_page(viewport={"width": 1280, "height": 800})
    not_found.goto(f"{BASE}/missing", wait_until="domcontentloaded", timeout=30000)
    assert not_found.get_by_role("heading", name="A loop went quiet.").is_visible()

    print({
        "desktop_title": desktop.title(),
        "desktop_h1": desktop.locator("h1").inner_text(),
        "mobile_no_overflow": True,
        "form_states": "invalid+success",
        "reduced_motion": "content-visible",
        "404": "custom-page-visible",
        "console_errors": console_errors,
        "failed_responses": failed_responses,
    })
    browser.close()
