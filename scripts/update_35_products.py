import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT.parent / "1688-csv-organizer" / "products.json"
OUTPUT = ROOT / "app" / "data" / "products.json"

TITLES = [
    "Commercial Stainless Steel Soy Milk Maker with Pulp Separation",
    "3500W Commercial Concave Induction Cooker for Stir-Fry and Hot Pot",
    "900L Four-Door Commercial Refrigerator and Freezer",
    "Large Double-Door UV Commercial Tableware Sterilizer Cabinet",
    "Compact UV Cup Sterilizer Cabinet for Office and Commercial Use",
    "Automatic Commercial Step-Type Water Boiler for Restaurants",
    "Commercial Single or Double Tank Electric Deep Fryer",
    "Commercial Stainless Steel Double-Speed Dough and Filling Mixer",
    "Commercial Double Tank Electric Deep Fryer for Restaurants",
    "Commercial Double-Door Stainless Steel Seafood Steamer Cabinet",
    "Automatic High-Capacity Commercial Cube Ice Maker",
    "Automatic Hood-Type Commercial Dishwasher",
    "Large Commercial Horizontal Chest Freezer",
    "Automatic Commercial Steam Cabinet for Rice and Food",
    "Double-Door Commercial Glass Refrigerated Display Cabinet",
    "Lockable Commercial Food Sample Retention Refrigerator",
    "Commercial Double-Deck Electric Bakery and Pizza Oven",
    "Commercial Frozen Drink and Slush Machine",
    "Commercial Dual-Temperature Refrigerated Worktable",
    "Heavy-Duty Commercial Stainless Steel Meat Grinder",
    "Commercial Double-Burner Induction Wok Range",
    "Commercial Stainless Steel Refrigerated Prep Worktable",
    "Large Double-Door High-Temperature Tableware Sterilizer",
    "Energy-Efficient Commercial Refrigerated Worktable",
    "Multi-Compartment Commercial Tableware Sterilizer Cabinet",
    "Three-Tank Commercial Hot and Cold Beverage Dispenser",
    "Heavy-Duty Commercial Stainless Steel Exhaust Hood",
    "Commercial Combination Steam and Convection Oven",
    "Integrated Commercial Kitchen Fume Purifier and Exhaust Hood",
    "Large Double-Door Hot-Air Commercial Sterilizer Cabinet",
    "Automatic Digital Commercial Rice Steamer Cabinet",
    "Automatic Commercial Frozen Meat Slicer",
    "Six-Pan Commercial Bain-Marie Food Warmer Counter",
    "Automatic Commercial Cooking Robot and Stir-Fry Machine",
    "Ultra-Thin 3500W Commercial Flat Induction Cooker",
]

CATEGORIES = {
    "食品加工": ("Food Processing Equipment", "Preparation & Processing"),
    "烹饪设备": ("Cooking Equipment", "Commercial Cooking"),
    "制冷设备": ("Refrigeration Equipment", "Commercial Refrigeration"),
    "洗涤消毒": ("Warewashing & Sterilization", "Cleaning & Sterilization"),
    "饮品设备": ("Beverage Equipment", "Beverage & Water Service"),
    "其他设备": ("Ventilation & Kitchen Systems", "Kitchen Systems"),
    "保温展示": ("Warming & Display Equipment", "Hot Food Display"),
}

source = json.loads(SOURCE.read_text(encoding="utf-8"))
if len(source) != 35:
    raise RuntimeError(f"Expected 35 products, found {len(source)}")

products = []
for index, (item, title) in enumerate(zip(source, TITLES), start=1):
    category, subcategory = CATEGORIES[item["category"]]
    products.append(
        {
            "id": f"COPINA-TK-{index:03d}",
            "category": category,
            "subcategory": subcategory,
            "name": title,
            "price": round(float(item["base_price_num"]) * 1.2, 2),
            "priceType": "Reference price; final configuration and freight confirmation required",
            "orderMode": "Order Online",
            "image": f"/products/COPINA_{index:02d}.jpg",
            "status": "Ready to publish",
            "specs": (
                f"Model: COPINA-TK-{index:03d} | Commercial-grade configuration | "
                "Contact COPINA to confirm voltage, capacity, dimensions and available options."
            ),
        }
    )

OUTPUT.write_text(json.dumps(products, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Updated {OUTPUT} with {len(products)} products")
