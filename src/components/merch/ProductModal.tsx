"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Plus,
  Image as ImageIcon,
  Check,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Trash2,
  Heart,
  Search,
  Bell,
  Crown,
  ChevronRight,
  UploadCloud,
  Minus,
  ArrowLeft,
  Sparkles,
  ShoppingBag,
} from "lucide-react";
import { Product } from "@/lib/data";

export interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product | null;
  onSave: (product: Product, isDraft?: boolean) => void;
  onUnpublish?: (productId: string) => void;
}

// Available category options
const CATEGORIES = ["Apparel", "Accessories", "Headwear", "Limited Edition"];

// Common standard sizes
const STANDARD_SIZES = ["XS", "S", "M", "L", "XL", "One Size"];

// Common preset colors
const PRESET_COLORS = [
  { name: "Navy", hex: "#1E3A8A" },
  { name: "Gray", hex: "#6B7280" },
  { name: "Black", hex: "#111827" },
  { name: "White", hex: "#F3F4F6" },
  { name: "Forest Green", hex: "#15803D" },
  { name: "Burgundy", hex: "#991B1B" },
  { name: "Tan", hex: "#D97706" },
];

// Sample images for quick preview selection
const SAMPLE_IMAGES = [
  {
    name: "Tactical Backpack",
    url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80",
    icon: "🎒",
  },
  {
    name: "MoneyHunt Joggers",
    url: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&auto=format&fit=crop&q=80",
    icon: "👟",
  },
  {
    name: "Classic Hoodie",
    url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80",
    icon: "🧥",
  },
  {
    name: "Hunter Cap",
    url: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&auto=format&fit=crop&q=80",
    icon: "🧢",
  },
];

export function ProductModal({
  isOpen,
  onClose,
  productToEdit,
  onSave,
  onUnpublish,
}: ProductModalProps) {
  const isEditMode = !!productToEdit;

  // Form State
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("MoneyHunt Official");
  const [category, setCategory] = useState("Apparel");
  const [description, setDescription] = useState("");
  const [retailPrice, setRetailPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [memberDiscount, setMemberDiscount] = useState("20");
  const [stock, setStock] = useState("142");
  const [lowStockAlert, setLowStockAlert] = useState("10");
  const [sku, setSku] = useState("");
  const [image, setImage] = useState("");
  const [imageFileName, setImageFileName] = useState("");
  const [selectedColors, setSelectedColors] = useState<
    Array<{ name: string; hex: string }>
  >([
    { name: "Navy", hex: "#1E3A8A" },
    { name: "Gray", hex: "#6B7280" },
  ]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([
    "S",
    "M",
    "L",
  ]);
  const [customSizeInput, setCustomSizeInput] = useState("");
  const [showAddSizeInput, setShowAddSizeInput] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [newColorName, setNewColorName] = useState("");
  const [newColorHex, setNewColorHex] = useState("#22C55E");

  // Badges & Placement Toggles
  const [badgeNew, setBadgeNew] = useState(true);
  const [badgeLimited, setBadgeLimited] = useState(false);
  const [badgeMemberDiscount, setBadgeMemberDiscount] = useState(true);
  const [featuredNewArrivals, setFeaturedNewArrivals] = useState(true);
  const [recommendedForYou, setRecommendedForYou] = useState(true);
  const [featuredBanner, setFeaturedBanner] = useState(false);

  // Visibility
  const [visibility, setVisibility] = useState<
    "Published" | "Members Only" | "Draft"
  >("Published");

  // UI / Preview State
  const [previewTab, setPreviewTab] = useState<"card" | "detail">("card");
  const [previewCategory, setPreviewCategory] = useState("All");
  const [isPublishing, setIsPublishing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isClosing, setIsClosing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formScrollRef = useRef<HTMLDivElement>(null);

  // Populate data when editing or opening
  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      setErrors({});
      setIsPublishing(false);
      if (productToEdit) {
        setName(productToEdit.name || "");
        setBrand(productToEdit.brand || "MoneyHunt Official");
        setCategory(productToEdit.category || "Apparel");
        setDescription(
          productToEdit.description ||
            "Premium quality tactical apparel with durable finish and MoneyHunt branding."
        );
        setRetailPrice(
          productToEdit.price !== undefined ? String(productToEdit.price) : "89.99"
        );
        setOriginalPrice(
          productToEdit.originalPrice !== undefined
            ? String(productToEdit.originalPrice)
            : (productToEdit.price * 1.33).toFixed(2)
        );
        setMemberDiscount(
          productToEdit.memberDiscount !== undefined
            ? String(productToEdit.memberDiscount)
            : "20"
        );
        setStock(
          productToEdit.stock !== undefined ? String(productToEdit.stock) : "142"
        );
        setLowStockAlert(
          productToEdit.lowStockAlert !== undefined
            ? String(productToEdit.lowStockAlert)
            : "10"
        );
        setSku(productToEdit.sku || "MH-BAG-002");
        setImage(productToEdit.image || "");
        setImageFileName(productToEdit.image ? "product-photo.jpg" : "");
        setSelectedColors(
          productToEdit.colors && productToEdit.colors.length > 0
            ? productToEdit.colors.map((c) => ({
                name: c,
                hex:
                  PRESET_COLORS.find(
                    (p) => p.name.toLowerCase() === c.toLowerCase()
                  )?.hex || "#374151",
              }))
            : [
                { name: "Navy", hex: "#1E3A8A" },
                { name: "Gray", hex: "#6B7280" },
              ]
        );
        setSelectedSizes(
          productToEdit.sizes && productToEdit.sizes.length > 0
            ? productToEdit.sizes
            : ["S", "M", "L"]
        );
        setBadgeNew(productToEdit.badges?.isNew ?? true);
        setBadgeLimited(productToEdit.badges?.isLimited ?? false);
        setBadgeMemberDiscount(
          productToEdit.badges?.showMemberDiscount ?? true
        );
        setFeaturedNewArrivals(
          productToEdit.badges?.featuredNewArrivals ?? true
        );
        setRecommendedForYou(
          productToEdit.badges?.recommendedForYou ?? true
        );
        setFeaturedBanner(productToEdit.badges?.featuredBanner ?? false);
        setVisibility(
          productToEdit.status === "Hidden"
            ? "Draft"
            : productToEdit.visibility || "Published"
        );
      } else {
        // Reset to initial new product defaults
        setName("");
        setBrand("MoneyHunt Official");
        setCategory("Apparel");
        setDescription(
          "30L tactical backpack with laptop sleeve, water-resistant finish, and dual bottle pockets."
        );
        setRetailPrice("89.99");
        setOriginalPrice("119.99");
        setMemberDiscount("20");
        setStock("142");
        setLowStockAlert("10");
        setSku("MH-BAG-002");
        setImage("");
        setImageFileName("");
        setSelectedColors([
          { name: "Navy", hex: "#1E3A8A" },
          { name: "Gray", hex: "#6B7280" },
        ]);
        setSelectedSizes(["S", "M", "L"]);
        setBadgeNew(true);
        setBadgeLimited(false);
        setBadgeMemberDiscount(true);
        setFeaturedNewArrivals(true);
        setRecommendedForYou(true);
        setFeaturedBanner(false);
        setVisibility("Published");
      }
    }
  }, [isOpen, productToEdit]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isPublishing) {
        handleCloseWithAnimation();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isPublishing]);

  if (!isOpen) return null;

  // Calculation helpers
  const numRetail = parseFloat(retailPrice) || 0;
  const numOriginal = parseFloat(originalPrice) || 0;
  const numDiscount = parseFloat(memberDiscount) || 0;
  const hasSavings = numOriginal > numRetail && numRetail > 0;
  const savingsAmount = hasSavings ? (numOriginal - numRetail).toFixed(2) : "0.00";
  const memberPrice =
    numRetail > 0
      ? (numRetail * (1 - Math.max(0, Math.min(100, numDiscount)) / 100)).toFixed(
          2
        )
      : "0.00";

  // File upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: "Image size must be less than 5MB",
        }));
        return;
      }
      setImageFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setErrors((prev) => {
          const rest = { ...prev };
          delete rest.image;
          return rest;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove image
  const handleRemoveImage = () => {
    setImage("");
    setImageFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Variant size toggle
  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // Add custom size
  const handleAddCustomSize = () => {
    if (customSizeInput.trim()) {
      const formatted = customSizeInput.trim().toUpperCase();
      if (!selectedSizes.includes(formatted)) {
        setSelectedSizes((prev) => [...prev, formatted]);
      }
      setCustomSizeInput("");
      setShowAddSizeInput(false);
    }
  };

  // Add color
  const handleAddColor = (name: string, hex: string) => {
    if (!selectedColors.some((c) => c.name.toLowerCase() === name.toLowerCase())) {
      setSelectedColors((prev) => [...prev, { name, hex }]);
    }
    setShowColorPicker(false);
  };

  // Remove color
  const handleRemoveColor = (colorName: string) => {
    setSelectedColors((prev) => prev.filter((c) => c.name !== colorName));
  };

  // Validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Required";
    }
    if (!category.trim()) {
      newErrors.category = "Required";
    }
    if (!retailPrice.trim() || isNaN(numRetail) || numRetail <= 0) {
      newErrors.retailPrice = "Required";
    }
    if (!stock.trim() || isNaN(parseInt(stock, 10)) || parseInt(stock, 10) < 0) {
      newErrors.stock = "Required";
    }

    // Price check: Original price must be > retail price if provided
    if (originalPrice.trim()) {
      if (isNaN(numOriginal) || numOriginal <= numRetail) {
        newErrors.originalPrice = "Must be higher than retail price";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      // Scroll to first error
      if (formScrollRef.current) {
        formScrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
      return false;
    }
    return true;
  };

  // Close with animation
  const handleCloseWithAnimation = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 250);
  };

  // Submit Handler: Publish to App
  const handlePublish = () => {
    if (!validateForm()) return;

    setIsPublishing(true);

    const generatedSku =
      sku.trim() ||
      `MH-${category.substring(0, 3).toUpperCase()}-${Math.floor(
        100 + Math.random() * 900
      )}`;

    const newProduct: Product = {
      id: productToEdit?.id || `p_${Date.now()}`,
      name: name.trim(),
      brand: brand.trim() || "MoneyHunt Official",
      category,
      price: numRetail,
      originalPrice: numOriginal > 0 ? numOriginal : undefined,
      memberDiscount: numDiscount,
      stock: parseInt(stock, 10) || 0,
      lowStockAlert: parseInt(lowStockAlert, 10) || 10,
      orders: productToEdit?.orders || 0,
      status: parseInt(stock, 10) < 15 ? "Low Stock" : "Active",
      sku: generatedSku,
      icon:
        category === "Apparel"
          ? "👟"
          : category === "Accessories"
          ? "🎒"
          : category === "Headwear"
          ? "🧢"
          : "✨",
      description: description.trim(),
      image: image || undefined,
      colors: selectedColors.map((c) => c.name),
      sizes: selectedSizes,
      badges: {
        isNew: badgeNew,
        isLimited: badgeLimited,
        showMemberDiscount: badgeMemberDiscount,
        featuredNewArrivals,
        recommendedForYou,
        featuredBanner,
      },
      visibility,
    };

    // Simulate 500ms publishing animation
    setTimeout(() => {
      onSave(newProduct, false);
      setIsPublishing(false);
      handleCloseWithAnimation();
    }, 500);
  };

  // Submit Handler: Save as Draft
  const handleSaveDraft = () => {
    if (!name.trim()) {
      setErrors({ name: "Required for draft" });
      return;
    }

    const generatedSku =
      sku.trim() ||
      `MH-${category.substring(0, 3).toUpperCase()}-${Math.floor(
        100 + Math.random() * 900
      )}`;

    const draftProduct: Product = {
      id: productToEdit?.id || `p_${Date.now()}`,
      name: name.trim(),
      brand: brand.trim() || "MoneyHunt Official",
      category,
      price: numRetail || 0,
      originalPrice: numOriginal > 0 ? numOriginal : undefined,
      memberDiscount: numDiscount || 0,
      stock: parseInt(stock, 10) || 0,
      lowStockAlert: parseInt(lowStockAlert, 10) || 10,
      orders: productToEdit?.orders || 0,
      status: "Draft",
      sku: generatedSku,
      icon: "📦",
      description: description.trim(),
      image: image || undefined,
      colors: selectedColors.map((c) => c.name),
      sizes: selectedSizes,
      badges: {
        isNew: badgeNew,
        isLimited: badgeLimited,
        showMemberDiscount: badgeMemberDiscount,
        featuredNewArrivals,
        recommendedForYou,
        featuredBanner,
      },
      visibility: "Draft",
    };

    onSave(draftProduct, true);
    handleCloseWithAnimation();
  };

  // Unpublish handler for edit mode
  const handleUnpublishAction = () => {
    if (productToEdit && onUnpublish) {
      onUnpublish(productToEdit.id);
      handleCloseWithAnimation();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 transition-all duration-300 ${
        isClosing ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(4px)" }}
    >
      {/* Modal Container */}
      <div
        className={`w-full max-w-[960px] h-[90vh] max-h-[90vh] bg-white rounded-[20px] shadow-2xl flex flex-col overflow-hidden border border-stone-200 transition-all duration-300 transform ${
          isClosing ? "scale-95 translate-y-4" : "scale-100 translate-y-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── MODAL HEADER (full width, 56px height, px-7) ── */}
        <div className="h-[56px] min-h-[56px] px-7 border-b border-[#E5E7EB] flex items-center justify-between bg-white select-none">
          <div>
            <h2 className="text-[16px] font-bold text-[#111111] leading-tight">
              {isEditMode ? `Edit Product · ${sku || productToEdit?.sku || "MH-BAG-002"}` : "Add New Product"}
            </h2>
            <p className="text-[12px] text-[#9CA3AF] leading-none mt-0.5">
              Published products appear instantly in the MoneyHunt app
            </p>
          </div>
          <button
            type="button"
            onClick={handleCloseWithAnimation}
            disabled={isPublishing}
            className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-colors disabled:opacity-50 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 text-stone-700" />
          </button>
        </div>

        {/* ── TWO COLUMN BODY ── */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          {/* ══════════════════════════════════════════════════════════
              LEFT COLUMN (560px) — Admin Form (scrollable)
             ══════════════════════════════════════════════════════════ */}
          <div
            ref={formScrollRef}
            className="w-full md:w-[560px] shrink-0 overflow-y-auto p-7 bg-white space-y-7 custom-scrollbar"
          >
            {/* ─── SECTION 1: PRODUCT INFO ─── */}
            <div>
              <div className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-[0.1em] mb-3.5">
                PRODUCT INFO
              </div>

              <div className="space-y-4">
                {/* Field: Product Name * */}
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) {
                        setErrors((prev) => {
                          const rest = { ...prev };
                          delete rest.name;
                          return rest;
                        });
                      }
                    }}
                    placeholder="e.g. MoneyHunt Joggers"
                    className={`w-full h-10 px-3.5 rounded-xl text-xs bg-white border transition-colors outline-none focus:ring-2 focus:ring-[#22C55E]/20 ${
                      errors.name
                        ? "border-red-500 focus:border-red-500"
                        : "border-[#E5E7EB] focus:border-[#22C55E]"
                    }`}
                  />
                  {errors.name && (
                    <span className="text-[11px] font-medium text-red-500 mt-1 block">
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Field: Brand / Seller Name */}
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    Brand / Seller Name
                  </label>
                  <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="MoneyHunt Official"
                    className="w-full h-10 px-3.5 rounded-xl text-xs bg-white border border-[#E5E7EB] focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20 transition-colors outline-none"
                  />
                  <span className="text-[11px] text-stone-400 mt-1 block">
                    (this shows as small gray text above product name in app)
                  </span>
                </div>

                {/* Field: Category * */}
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={category}
                      onChange={(e) => {
                        setCategory(e.target.value);
                        if (errors.category) {
                          setErrors((prev) => {
                            const rest = { ...prev };
                            delete rest.category;
                            return rest;
                          });
                        }
                      }}
                      className={`w-full h-10 px-3.5 rounded-xl text-xs bg-white border transition-colors outline-none appearance-none focus:ring-2 focus:ring-[#22C55E]/20 cursor-pointer ${
                        errors.category
                          ? "border-red-500 focus:border-red-500"
                          : "border-[#E5E7EB] focus:border-[#22C55E]"
                      }`}
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400 text-xs">
                      ▼
                    </div>
                  </div>
                  {errors.category && (
                    <span className="text-[11px] font-medium text-red-500 mt-1 block">
                      {errors.category}
                    </span>
                  )}
                </div>

                {/* Field: Short Description */}
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    Short Description
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="30L tactical backpack with laptop sleeve, water-resistant finish..."
                    className="w-full p-3 rounded-xl text-xs bg-white border border-[#E5E7EB] focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20 transition-colors outline-none resize-none leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* ─── SECTION 2: PRICING ─── */}
            <div className="pt-2 border-t border-[#E5E7EB]">
              <div className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-[0.1em] mb-3.5">
                PRICING
              </div>

              <div className="space-y-4">
                {/* Row 1 — 2 fields side by side */}
                <div className="grid grid-cols-2 gap-3.5">
                  {/* Retail Price ($) * */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-800 mb-1">
                      Retail Price ($) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs font-semibold">
                        $
                      </span>
                      <input
                        type="number"
                        step="0.01"
                        value={retailPrice}
                        onChange={(e) => {
                          setRetailPrice(e.target.value);
                          if (errors.retailPrice) {
                            setErrors((prev) => {
                              const rest = { ...prev };
                              delete rest.retailPrice;
                              return rest;
                            });
                          }
                        }}
                        placeholder="89.99"
                        className={`w-full h-10 pl-7 pr-3 rounded-xl text-xs bg-white border transition-colors outline-none focus:ring-2 focus:ring-[#22C55E]/20 ${
                          errors.retailPrice
                            ? "border-red-500 focus:border-red-500"
                            : "border-[#E5E7EB] focus:border-[#22C55E]"
                        }`}
                      />
                    </div>
                    {errors.retailPrice && (
                      <span className="text-[11px] font-medium text-red-500 mt-1 block">
                        {errors.retailPrice}
                      </span>
                    )}
                  </div>

                  {/* Original Price ($) */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-800 mb-1">
                      Original Price ($)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs font-semibold">
                        $
                      </span>
                      <input
                        type="number"
                        step="0.01"
                        value={originalPrice}
                        onChange={(e) => {
                          setOriginalPrice(e.target.value);
                          if (errors.originalPrice) {
                            setErrors((prev) => {
                              const rest = { ...prev };
                              delete rest.originalPrice;
                              return rest;
                            });
                          }
                        }}
                        placeholder="119.99"
                        className={`w-full h-10 pl-7 pr-3 rounded-xl text-xs bg-white border transition-colors outline-none focus:ring-2 focus:ring-[#22C55E]/20 ${
                          errors.originalPrice
                            ? "border-red-500 focus:border-red-500"
                            : "border-[#E5E7EB] focus:border-[#22C55E]"
                        }`}
                      />
                    </div>
                    {errors.originalPrice ? (
                      <span className="text-[11px] font-medium text-red-500 mt-1 block">
                        {errors.originalPrice}
                      </span>
                    ) : (
                      <span className="text-[10px] text-stone-400 mt-0.5 block">
                        Shows as strikethrough
                      </span>
                    )}
                  </div>
                </div>

                {/* Auto-calculated row: "Save $X.XX" badge preview */}
                {hasSavings && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-[#FFF0F0] rounded-xl border border-red-100 animate-fade">
                    <span className="text-[12px] font-bold text-[#EF4444] px-2 py-0.5 rounded-md bg-white border border-red-200">
                      Save ${savingsAmount}
                    </span>
                    <span className="text-[11px] text-stone-500">
                      Matches app&apos;s red savings badge on product card
                    </span>
                  </div>
                )}

                {/* Row 2 — Member Discount */}
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    Premium Member Discount
                  </label>
                  <div className="relative w-36">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={memberDiscount}
                      onChange={(e) => setMemberDiscount(e.target.value)}
                      placeholder="20"
                      className="w-full h-10 pl-3.5 pr-8 rounded-xl text-xs bg-white border border-[#E5E7EB] focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20 transition-colors outline-none"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-xs font-bold">
                      %
                    </span>
                  </div>

                  {/* Preview line: Exact match to app's green member price banner style */}
                  <div className="mt-2.5 p-3 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">👑</span>
                      <div>
                        <div className="text-xs font-bold text-[#15803D]">
                          Member Price: ${memberPrice}
                        </div>
                        <div className="text-[10px] text-stone-500">
                          You save {numDiscount}% with membership
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                      App Banner
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── SECTION 3: PRODUCT VARIANTS ─── */}
            <div className="pt-2 border-t border-[#E5E7EB]">
              <div className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-[0.1em] mb-3.5">
                VARIANTS
              </div>

              <div className="space-y-4">
                {/* Available Colors */}
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                    Available Colors
                  </label>
                  <div className="flex flex-wrap items-center gap-2">
                    {selectedColors.map((col) => (
                      <div
                        key={col.name}
                        className="h-7 pl-2 pr-1.5 rounded-full bg-stone-50 border border-stone-200 flex items-center gap-1.5 text-xs text-stone-800 font-medium group transition-colors hover:border-stone-300"
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-stone-300 shadow-xs"
                          style={{ backgroundColor: col.hex }}
                        />
                        <span>{col.name}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveColor(col.name)}
                          className="w-4 h-4 rounded-full flex items-center justify-center text-stone-400 hover:text-red-500 hover:bg-stone-200 ml-0.5 transition-colors"
                        >
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    ))}

                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowColorPicker(!showColorPicker)}
                        className="h-7 px-3 rounded-full border border-dashed border-stone-300 hover:border-[#22C55E] hover:text-[#22C55E] text-stone-500 flex items-center gap-1 text-xs font-semibold transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                        Add Color
                      </button>

                      {/* Dropdown color picker */}
                      {showColorPicker && (
                        <div className="absolute left-0 top-8 z-30 w-52 p-3 bg-white rounded-xl shadow-xl border border-stone-200 animate-fade">
                          <div className="text-[11px] font-bold text-stone-700 mb-2">
                            Select Presets
                          </div>
                          <div className="grid grid-cols-2 gap-1.5 mb-3">
                            {PRESET_COLORS.map((p) => (
                              <button
                                key={p.name}
                                type="button"
                                onClick={() => handleAddColor(p.name, p.hex)}
                                className="flex items-center gap-1.5 p-1 rounded-lg hover:bg-stone-100 text-[11px] text-stone-700 text-left"
                              >
                                <span
                                  className="w-3 h-3 rounded-full border border-stone-300"
                                  style={{ backgroundColor: p.hex }}
                                />
                                <span className="truncate">{p.name}</span>
                              </button>
                            ))}
                          </div>
                          <div className="pt-2 border-t border-stone-100 flex items-center gap-1.5">
                            <input
                              type="color"
                              value={newColorHex}
                              onChange={(e) => setNewColorHex(e.target.value)}
                              className="w-6 h-6 rounded cursor-pointer border-0 p-0"
                            />
                            <input
                              type="text"
                              value={newColorName}
                              onChange={(e) => setNewColorName(e.target.value)}
                              placeholder="Color name"
                              className="flex-1 h-6 px-2 text-[11px] rounded border border-stone-200 outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (newColorName.trim()) {
                                  handleAddColor(
                                    newColorName.trim(),
                                    newColorHex
                                  );
                                  setNewColorName("");
                                }
                              }}
                              className="px-2 h-6 bg-[#22C55E] text-white text-[10px] font-bold rounded"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Available Sizes */}
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                    Available Sizes
                  </label>
                  <div className="flex flex-wrap items-center gap-2">
                    {STANDARD_SIZES.map((size) => {
                      const isSelected = selectedSizes.includes(size);
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => toggleSize(size)}
                          className={`h-8 min-w-[36px] px-2.5 rounded-lg text-xs font-bold transition-all ${
                            isSelected
                              ? "bg-[#22C55E] text-white shadow-xs"
                              : "bg-white text-stone-600 border border-stone-200 hover:border-stone-300"
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}

                    {/* Custom Sizes Added */}
                    {selectedSizes
                      .filter((s) => !STANDARD_SIZES.includes(s))
                      .map((custom) => (
                        <button
                          key={custom}
                          type="button"
                          onClick={() => toggleSize(custom)}
                          className="h-8 min-w-[36px] px-2.5 rounded-lg text-xs font-bold bg-[#22C55E] text-white shadow-xs flex items-center gap-1"
                        >
                          {custom}
                          <X className="w-3 h-3 text-white/80 hover:text-white" />
                        </button>
                      ))}

                    {/* Add Size */}
                    {showAddSizeInput ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="text"
                          value={customSizeInput}
                          onChange={(e) => setCustomSizeInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddCustomSize();
                            }
                          }}
                          placeholder="e.g. 2XL"
                          className="w-16 h-8 px-2 text-xs rounded-lg border border-[#22C55E] outline-none"
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={handleAddCustomSize}
                          className="h-8 px-2 bg-[#22C55E] text-white text-xs font-bold rounded-lg"
                        >
                          ✓
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowAddSizeInput(false)}
                          className="h-8 px-2 text-stone-400 hover:text-stone-600 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShowAddSizeInput(true)}
                        className="h-8 px-3 rounded-lg border border-dashed border-stone-300 hover:border-[#22C55E] hover:text-[#22C55E] text-stone-500 flex items-center gap-1 text-xs font-semibold transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                        Add Size
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ─── SECTION 4: INVENTORY ─── */}
            <div className="pt-2 border-t border-[#E5E7EB]">
              <div className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-[0.1em] mb-3.5">
                INVENTORY
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3.5">
                  {/* Stock Quantity * */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-800 mb-1">
                      Stock Quantity <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={stock}
                      onChange={(e) => {
                        setStock(e.target.value);
                        if (errors.stock) {
                          setErrors((prev) => {
                            const rest = { ...prev };
                            delete rest.stock;
                            return rest;
                          });
                        }
                      }}
                      placeholder="142"
                      className={`w-full h-10 px-3.5 rounded-xl text-xs bg-white border transition-colors outline-none focus:ring-2 focus:ring-[#22C55E]/20 ${
                        errors.stock
                          ? "border-red-500 focus:border-red-500"
                          : "border-[#E5E7EB] focus:border-[#22C55E]"
                      }`}
                    />
                    {errors.stock && (
                      <span className="text-[11px] font-medium text-red-500 mt-1 block">
                        {errors.stock}
                      </span>
                    )}
                  </div>

                  {/* Low Stock Alert At */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-800 mb-1">
                      Low Stock Alert At
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={lowStockAlert}
                      onChange={(e) => setLowStockAlert(e.target.value)}
                      placeholder="10"
                      className="w-full h-10 px-3.5 rounded-xl text-xs bg-white border border-[#E5E7EB] focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20 transition-colors outline-none"
                    />
                  </div>
                </div>

                {/* SKU Code */}
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    SKU Code
                  </label>
                  <input
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="MH-BAG-002"
                    className="w-full h-10 px-3.5 rounded-xl text-xs bg-white border border-[#E5E7EB] focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20 transition-colors outline-none uppercase font-mono"
                  />
                  <span className="text-[11px] text-stone-400 mt-1 block">
                    Auto-generated if empty
                  </span>
                </div>
              </div>
            </div>

            {/* ─── SECTION 5: PRODUCT IMAGE ─── */}
            <div className="pt-2 border-t border-[#E5E7EB]">
              <div className="flex items-center justify-between mb-1">
                <div className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-[0.1em]">
                  PRODUCT IMAGE
                </div>
                {image && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="text-[11px] text-red-500 hover:text-red-700 font-semibold flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    ✕ Remove
                  </button>
                )}
              </div>
              <p className="text-[11px] text-stone-400 mb-3">
                This image shows in the app product card
              </p>

              {/* Upload Box */}
              {!image ? (
                <div>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-[120px] rounded-[12px] border-2 border-dashed border-[#E5E7EB] bg-[#F9FAFB] hover:bg-[#F3F4F6] hover:border-[#22C55E]/50 flex flex-col items-center justify-center cursor-pointer transition-all px-4 text-center group"
                  >
                    <div className="w-9 h-9 rounded-full bg-white shadow-xs flex items-center justify-center text-lg mb-1.5 group-hover:scale-105 transition-transform">
                      🖼️
                    </div>
                    <div className="text-xs font-bold text-stone-700">
                      Upload product photo
                    </div>
                    <div className="text-[10px] text-stone-400 mt-0.5">
                      PNG, JPG, WebP · Max 5MB
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                      className="mt-2 px-3 py-1 text-[10px] font-bold rounded-lg border border-stone-300 bg-white text-stone-700 hover:bg-stone-50"
                    >
                      Choose File
                    </button>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    className="hidden"
                    onChange={handleFileUpload}
                  />

                  {/* Sample presets for fast testing */}
                  <div className="mt-3">
                    <div className="text-[10px] font-semibold text-stone-400 mb-1.5">
                      Or select sample demo product image:
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                      {SAMPLE_IMAGES.map((sample) => (
                        <button
                          key={sample.name}
                          type="button"
                          onClick={() => {
                            setImage(sample.url);
                            setImageFileName(sample.name);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-stone-50 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 text-[11px] font-medium text-stone-700 flex items-center gap-1.5 transition-colors shrink-0"
                        >
                          <span>{sample.icon}</span>
                          <span>{sample.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* When uploaded: Show image thumbnail 80×80px + Remove link */
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center gap-4">
                  <div className="w-[80px] h-[80px] rounded-lg overflow-hidden border border-stone-200 bg-white shrink-0 shadow-xs relative">
                    <img
                      src={image}
                      alt="Product preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-stone-800 truncate">
                      {imageFileName || "product-image.jpg"}
                    </div>
                    <div className="text-[11px] text-stone-400 mt-0.5">
                      Uploaded photo ready for live preview
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-[11px] font-semibold text-emerald-600 hover:underline"
                      >
                        Replace Image
                      </button>
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="text-[11px] font-semibold text-red-500 hover:underline"
                      >
                        ✕ Remove
                      </button>
                    </div>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </div>
              )}
            </div>

            {/* ─── SECTION 6: APP DISPLAY BADGES ─── */}
            <div className="pt-2 border-t border-[#E5E7EB]">
              <div className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-[0.1em] mb-3.5">
                APP BADGES &amp; PLACEMENT
              </div>

              <div className="space-y-3">
                {/* Toggle 1: [New] green badge */}
                <label className="flex items-center justify-between p-2.5 rounded-xl border border-stone-100 hover:bg-stone-50 cursor-pointer transition-colors">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#22C55E] text-white">
                      New
                    </span>
                    <span className="text-xs font-medium text-stone-700">
                      Show NEW badge on product card
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={badgeNew}
                    onChange={(e) => setBadgeNew(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                </label>

                {/* Toggle 2: [Limited] red badge */}
                <label className="flex items-center justify-between p-2.5 rounded-xl border border-stone-100 hover:bg-stone-50 cursor-pointer transition-colors">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#EF4444] text-white">
                      Limited
                    </span>
                    <span className="text-xs font-medium text-stone-700">
                      Show LIMITED badge on product card
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={badgeLimited}
                    onChange={(e) => setBadgeLimited(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                </label>

                {/* Toggle 3: Member discount overlay */}
                <label className="flex items-center justify-between p-2.5 rounded-xl border border-stone-100 hover:bg-stone-50 cursor-pointer transition-colors">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-700 text-white">
                      Member {numDiscount}% off
                    </span>
                    <span className="text-xs font-medium text-stone-700">
                      Show member discount % on card image
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={badgeMemberDiscount}
                    onChange={(e) => setBadgeMemberDiscount(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                </label>

                {/* Toggle 4: Featured in New Arrivals */}
                <label className="flex items-center justify-between p-2.5 rounded-xl border border-stone-100 hover:bg-stone-50 cursor-pointer transition-colors">
                  <span className="text-xs font-medium text-stone-700">
                    Featured in New Arrivals section
                  </span>
                  <input
                    type="checkbox"
                    checked={featuredNewArrivals}
                    onChange={(e) => setFeaturedNewArrivals(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                </label>

                {/* Toggle 5: Show in Recommended For You */}
                <label className="flex items-center justify-between p-2.5 rounded-xl border border-stone-100 hover:bg-stone-50 cursor-pointer transition-colors">
                  <span className="text-xs font-medium text-stone-700">
                    Show in Recommended For You list
                  </span>
                  <input
                    type="checkbox"
                    checked={recommendedForYou}
                    onChange={(e) => setRecommendedForYou(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                </label>

                {/* Toggle 6: Show in Featured Banner */}
                <label className="flex items-center justify-between p-2.5 rounded-xl border border-stone-100 hover:bg-stone-50 cursor-pointer transition-colors">
                  <span className="text-xs font-medium text-stone-700">
                    Show in Featured Banner (top of page)
                  </span>
                  <input
                    type="checkbox"
                    checked={featuredBanner}
                    onChange={(e) => setFeaturedBanner(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                </label>
              </div>
            </div>

            {/* ─── SECTION 7: VISIBILITY ─── */}
            <div className="pt-2 border-t border-[#E5E7EB]">
              <div className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-[0.1em] mb-3.5">
                VISIBILITY
              </div>

              <div className="space-y-2.5">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-stone-800">
                  <input
                    type="radio"
                    name="product_visibility"
                    value="Published"
                    checked={visibility === "Published"}
                    onChange={() => setVisibility("Published")}
                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                  <span>
                    <strong className="text-stone-900">Published</strong> — visible
                    to all users
                  </span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-stone-800">
                  <input
                    type="radio"
                    name="product_visibility"
                    value="Members Only"
                    checked={visibility === "Members Only"}
                    onChange={() => setVisibility("Members Only")}
                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                  <span>
                    <strong className="text-stone-900">Members Only</strong> — Premium
                    subscribers
                  </span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-stone-800">
                  <input
                    type="radio"
                    name="product_visibility"
                    value="Draft"
                    checked={visibility === "Draft"}
                    onChange={() => setVisibility("Draft")}
                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                  <span>
                    <strong className="text-stone-900">Draft</strong> — hidden from
                    app
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* ── VERTICAL DIVIDER BETWEEN COLUMNS ── */}
          <div className="hidden md:block w-px bg-[#E5E7EB] shrink-0 self-stretch" />

          {/* ══════════════════════════════════════════════════════════
              RIGHT COLUMN (400px) — Live Phone Preview
             ══════════════════════════════════════════════════════════ */}
          <div className="w-full md:w-[400px] shrink-0 bg-[#F5F4EF] p-7 flex flex-col items-center justify-start overflow-y-auto select-none">
            {/* Header info */}
            <div className="text-center mb-5">
              <div className="text-xs font-bold text-stone-800">
                Live App Preview
              </div>
              <div className="text-[11px] text-stone-500">
                Updates as you type
              </div>
            </div>

            {/* ── PHONE FRAME (280px wide shell) ── */}
            <div
              className="w-[280px] bg-[#1A1A1A] rounded-[36px] p-2.5 relative shrink-0"
              style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.3)" }}
            >
              {/* Top Notch (64px wide × 18px tall, centered top) */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 h-[18px] bg-[#1A1A1A] rounded-b-xl z-20 flex items-center justify-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-stone-800" />
                <div className="w-6 h-1 rounded-full bg-stone-800" />
              </div>

              {/* ── PHONE SCREEN (inside frame, 520px tall, 28px radius) ── */}
              <div className="w-full h-[520px] bg-white rounded-[28px] overflow-hidden flex flex-col relative">
                {/* Status Bar */}
                <div className="h-6 px-4 pt-1 flex items-center justify-between text-[9px] font-bold text-stone-700 bg-white shrink-0">
                  <span>9:41</span>
                  <div className="flex items-center gap-1">
                    <span className="text-[8px]">5G</span>
                    <span className="text-[9px]">100%</span>
                  </div>
                </div>

                {/* SMALL TAB SWITCHER AT TOP OF PHONE SCREEN */}
                <div className="flex items-center border-b border-stone-100 px-3 bg-stone-50/70 shrink-0">
                  <button
                    type="button"
                    onClick={() => setPreviewTab("card")}
                    className={`flex-1 py-1.5 text-[10px] font-bold transition-all text-center relative ${
                      previewTab === "card"
                        ? "text-[#22C55E]"
                        : "text-stone-400 hover:text-stone-600"
                    }`}
                  >
                    Card View
                    {previewTab === "card" && (
                      <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#22C55E] rounded-full" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewTab("detail")}
                    className={`flex-1 py-1.5 text-[10px] font-bold transition-all text-center relative ${
                      previewTab === "detail"
                        ? "text-[#22C55E]"
                        : "text-stone-400 hover:text-stone-600"
                    }`}
                  >
                    Detail View
                    {previewTab === "detail" && (
                      <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#22C55E] rounded-full" />
                    )}
                  </button>
                </div>

                {/* ─── PREVIEW VIEW 1: CARD VIEW ─── */}
                {previewTab === "card" && (
                  <div className="flex-1 overflow-y-auto p-2.5 space-y-2.5 custom-scrollbar bg-stone-50/30">
                    {/* App Header (small) */}
                    <div className="flex items-center justify-between py-1">
                      <div className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center text-[10px] text-stone-700 relative">
                        🔔
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 absolute top-0.5 right-0.5" />
                      </div>
                      <div className="text-[10px] font-extrabold tracking-tight">
                        <span className="text-stone-900">THE MONEY </span>
                        <span className="text-[#22C55E]">HUNT</span>
                        <span className="text-stone-900"> APP</span>
                      </div>
                      <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white font-bold text-[8px] flex items-center justify-center shadow-xs">
                        JD
                      </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative">
                      <input
                        type="text"
                        readOnly
                        placeholder="Search products..."
                        className="w-full h-6 pl-2.5 pr-6 rounded-lg text-[9px] bg-stone-100 border-none text-stone-500 placeholder:text-stone-400 pointer-events-none"
                      />
                      <Search className="w-3 h-3 text-stone-400 absolute right-2 top-1/2 -translate-y-1/2" />
                    </div>

                    {/* Category Chips Row */}
                    <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
                      {["All", "Apparel", "Accessories", "Limited"].map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setPreviewCategory(c)}
                          className={`px-2 py-0.5 rounded-full text-[8.5px] font-bold shrink-0 transition-colors ${
                            previewCategory === c
                              ? "bg-[#22C55E] text-white"
                              : "bg-white text-stone-600 border border-stone-200"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>

                    {/* Banner (small, below filters) */}
                    <div className="p-2 rounded-xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 text-white shadow-xs">
                      <div className="text-[7px] font-bold text-emerald-400 tracking-wider">
                        NEW COLLECTION 2026
                      </div>
                      <div className="text-[10px] font-black leading-tight mt-0.5">
                        MoneyHunt SS25 Drop
                      </div>
                      <div className="mt-1 flex justify-start">
                        <span className="text-[7.5px] font-bold px-2 py-0.5 rounded-full bg-[#22C55E] text-white inline-block">
                          Shop Now +
                        </span>
                      </div>
                    </div>

                    {/* "New Arrivals" section */}
                    <div className="flex items-center justify-between text-[9px] font-bold text-stone-800 pt-0.5">
                      <span>New Arrivals</span>
                      <span className="text-[8px] text-[#22C55E] font-semibold flex items-center">
                        View All &gt;
                      </span>
                    </div>

                    {/* PRODUCT CARD PREVIEW (the live product card) */}
                    <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden flex flex-col">
                      {/* Top area (image) - Height 110px */}
                      <div className="h-[110px] bg-[#F3F4F6] relative overflow-hidden flex items-center justify-center">
                        {image ? (
                          <img
                            src={image}
                            alt={name || "Product"}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-stone-300">
                            <span className="text-3xl mb-0.5">
                              {category === "Apparel"
                                ? "👟"
                                : category === "Accessories"
                                ? "🎒"
                                : category === "Headwear"
                                ? "🧢"
                                : "🛍️"}
                            </span>
                            <span className="text-[8px] font-bold text-stone-400 uppercase tracking-wider">
                              Preview Image
                            </span>
                          </div>
                        )}

                        {/* Top-left badge: New or Limited */}
                        <div className="absolute top-1.5 left-1.5 flex flex-col gap-1 z-10">
                          {badgeNew && (
                            <span className="px-1.5 py-0.5 rounded text-[7.5px] font-extrabold bg-[#22C55E] text-white shadow-xs">
                              New
                            </span>
                          )}
                          {badgeLimited && (
                            <span className="px-1.5 py-0.5 rounded text-[7.5px] font-extrabold bg-[#EF4444] text-white shadow-xs">
                              Limited
                            </span>
                          )}
                        </div>

                        {/* Wishlist Heart Icon top-right */}
                        <button
                          type="button"
                          className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-white/90 shadow-xs flex items-center justify-center text-[10px] text-stone-400 hover:text-red-500 z-10"
                        >
                          🤍
                        </button>

                        {/* Bottom-left of image: Member X% off overlay */}
                        {badgeMemberDiscount && numDiscount > 0 && (
                          <div className="absolute bottom-1.5 left-1.5 z-10">
                            <span className="px-1.5 py-0.5 rounded text-[7.5px] font-extrabold bg-[#15803D] text-white shadow-sm flex items-center gap-0.5">
                              <span>Member {numDiscount}% off</span>
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Below image */}
                      <div className="p-2 space-y-1">
                        <div className="text-[9px] text-stone-400 font-medium truncate">
                          {brand || "MoneyHunt Official"}
                        </div>
                        <div className="text-[12px] font-bold text-[#111111] truncate leading-tight">
                          {name || "MoneyHunt Joggers"}
                        </div>

                        {/* Price row */}
                        <div className="flex items-baseline gap-1.5 pt-0.5">
                          <span className="text-[13px] font-bold text-[#22C55E]">
                            ${numRetail ? numRetail.toFixed(2) : "89.99"}
                          </span>
                          {numOriginal > 0 && (
                            <span className="text-[10px] text-stone-400 line-through">
                              ${numOriginal.toFixed(2)}
                            </span>
                          )}
                        </div>

                        {/* [+ Add to Cart] button */}
                        <button
                          type="button"
                          className="w-full mt-1 py-1 rounded-md bg-[#22C55E] text-white text-[10px] font-bold text-center shadow-xs hover:bg-[#16A34A] transition-colors"
                        >
                          + Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* ─── PREVIEW VIEW 2: DETAIL VIEW ─── */}
                {previewTab === "detail" && (
                  <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col bg-white">
                    {/* Large Product Image Area: Height 160px */}
                    <div className="h-[160px] w-full bg-[#F3F4F6] relative overflow-hidden shrink-0 flex items-center justify-center">
                      {image ? (
                        <img
                          src={image}
                          alt={name || "Product detail"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-stone-300">
                          <span className="text-4xl mb-1">
                            {category === "Apparel"
                              ? "👟"
                              : category === "Accessories"
                              ? "🎒"
                              : category === "Headwear"
                              ? "🧢"
                              : "🛍️"}
                          </span>
                          <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider">
                            MoneyHunt Store
                          </span>
                        </div>
                      )}

                      {/* Header overlay icons */}
                      <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-10">
                        <button
                          type="button"
                          onClick={() => setPreviewTab("card")}
                          className="w-6 h-6 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-stone-700 shadow-xs"
                        >
                          <ArrowLeft className="w-3 h-3" />
                        </button>
                        <div className="flex items-center gap-1.5">
                          {badgeLimited && (
                            <span className="px-1.5 py-0.5 rounded text-[8px] font-black bg-[#EF4444] text-white shadow-xs">
                              Limited
                            </span>
                          )}
                          <button
                            type="button"
                            className="w-6 h-6 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-stone-500 shadow-xs"
                          >
                            🤍
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Content Below */}
                    <div className="p-3 space-y-2.5 flex-1">
                      <div>
                        <div className="text-[10px] text-stone-400 font-medium">
                          {brand || "MoneyHunt Official"}
                        </div>
                        <div className="flex items-center justify-between gap-1 mt-0.5">
                          <h3 className="text-[16px] font-bold text-black leading-tight truncate">
                            {name || "MoneyHunt Joggers"}
                          </h3>
                        </div>
                      </div>

                      {/* Price row */}
                      <div className="flex items-baseline gap-2">
                        <span className="text-[20px] font-bold text-[#22C55E] leading-none">
                          ${numRetail ? numRetail.toFixed(2) : "89.99"}
                        </span>
                        {numOriginal > 0 && (
                          <span className="text-[13px] text-stone-400 line-through">
                            ${numOriginal.toFixed(2)}
                          </span>
                        )}
                        {hasSavings && (
                          <span className="text-[11px] font-bold text-[#EF4444] bg-[#FFF0F0] px-1.5 py-0.5 rounded">
                            Save ${savingsAmount}
                          </span>
                        )}
                      </div>

                      {/* Member price banner */}
                      <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-[10px] p-2 flex items-center gap-2">
                        <span className="text-base text-emerald-600">👑</span>
                        <div>
                          <div className="text-[12px] font-bold text-[#15803D]">
                            Member Price: ${memberPrice}
                          </div>
                          <div className="text-[10px] text-stone-500">
                            You save {numDiscount}% with membership
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <div className="text-[12px] font-bold text-stone-800 mb-0.5">
                          Description
                        </div>
                        <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed">
                          {description ||
                            "30L tactical backpack with laptop sleeve, water-resistant finish, and dual bottle pockets."}
                        </p>
                      </div>

                      {/* Color */}
                      {selectedColors.length > 0 && (
                        <div>
                          <div className="text-[11px] font-bold text-stone-800 mb-1">
                            Color
                          </div>
                          <div className="flex items-center gap-1.5">
                            {selectedColors.map((col, idx) => (
                              <span
                                key={col.name}
                                className={`w-4 h-4 rounded-full border shadow-xs transition-transform ${
                                  idx === 0
                                    ? "ring-2 ring-emerald-500 ring-offset-1 scale-110"
                                    : "border-stone-300"
                                }`}
                                style={{ backgroundColor: col.hex }}
                                title={col.name}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Size */}
                      {selectedSizes.length > 0 && (
                        <div>
                          <div className="text-[11px] font-bold text-stone-800 mb-1">
                            Size
                          </div>
                          <div className="flex items-center gap-1 overflow-x-auto pb-0.5">
                            {selectedSizes.map((s, idx) => (
                              <span
                                key={s}
                                className={`px-2 py-0.5 rounded text-[9px] font-bold border ${
                                  idx === 0
                                    ? "bg-[#22C55E] text-white border-[#22C55E]"
                                    : "bg-white text-stone-700 border-stone-200"
                                }`}
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Quantity row */}
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] font-bold text-stone-800">
                          Quantity
                        </span>
                        <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-stone-50">
                          <span className="w-5 h-5 flex items-center justify-center text-xs text-stone-500">
                            −
                          </span>
                          <span className="w-6 text-center text-[10px] font-bold text-stone-800">
                            1
                          </span>
                          <span className="w-5 h-5 flex items-center justify-center text-xs text-stone-500">
                            +
                          </span>
                        </div>
                      </div>

                      {/* Bottom action buttons */}
                      <div className="pt-2 flex items-center gap-1.5">
                        <button
                          type="button"
                          className="flex-1 py-1.5 rounded-lg border border-stone-300 text-stone-800 text-[10px] font-bold flex items-center justify-center gap-1 hover:bg-stone-50 transition-colors"
                        >
                          🛒 Add to Cart
                        </button>
                        <button
                          type="button"
                          className="flex-1 py-1.5 rounded-lg bg-[#22C55E] text-white text-[10px] font-bold text-center hover:bg-[#16A34A] transition-colors shadow-xs"
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── FOOTER (full width, sticky bottom, 68px, px-7) ── */}
        <div className="h-[68px] min-h-[68px] px-7 border-t border-[#E5E7EB] bg-white flex items-center justify-end gap-3 select-none">
          {/* Cancel button */}
          <button
            type="button"
            onClick={handleCloseWithAnimation}
            disabled={isPublishing}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>

          {isEditMode ? (
            <>
              {/* Unpublish button for edit mode */}
              <button
                type="button"
                onClick={handleUnpublishAction}
                disabled={isPublishing}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 transition-colors disabled:opacity-50 cursor-pointer"
              >
                Unpublish
              </button>

              {/* Save Changes button */}
              <button
                type="button"
                onClick={handlePublish}
                disabled={isPublishing}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#22C55E] hover:bg-[#16A34A] text-white shadow-xs transition-colors flex items-center gap-2 disabled:opacity-70 cursor-pointer"
              >
                {isPublishing ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>Save Changes</span>
                )}
              </button>
            </>
          ) : (
            <>
              {/* Save as Draft button */}
              <button
                type="button"
                onClick={handleSaveDraft}
                disabled={isPublishing}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-stone-300 text-stone-700 hover:bg-stone-50 transition-colors disabled:opacity-50 cursor-pointer"
              >
                Save as Draft
              </button>

              {/* Publish to App → button */}
              <button
                type="button"
                onClick={handlePublish}
                disabled={isPublishing}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#22C55E] hover:bg-[#16A34A] text-white shadow-xs transition-colors flex items-center gap-2 disabled:opacity-70 cursor-pointer"
              >
                {isPublishing ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Publishing...</span>
                  </>
                ) : (
                  <span>Publish to App →</span>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
