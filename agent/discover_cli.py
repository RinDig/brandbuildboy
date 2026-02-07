from __future__ import annotations

import argparse
import json

from agent.discovery import discover_category_urls


def main() -> None:
    parser = argparse.ArgumentParser(description="Discover site paths for auto-pull")
    parser.add_argument("--website", required=True, help="Company website base URL")
    args = parser.parse_args()

    result = discover_category_urls(args.website)
    print(json.dumps(result))


if __name__ == "__main__":
    main()
