"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { MapPin, Clock, Menu, X, Sparkles, Camera, Utensils, History, Lightbulb, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LazyImage } from "@/components/LazyImage"
import { FloatingNeonOrbs, ParallaxSection, NeonLines } from "@/components/ParallaxElements"
import { ScrollProgress } from "@/components/ScrollProgress"
import { NeonTubeTextLight, NeonTubeTextLightBlue } from "@/components/NeonTubeText"
import { NeonButton } from "@/components/NeonButton"
import { NeonNavItem } from "@/components/NeonNavItem"
import { SpotCard as SpotCardComponent } from "@/components/SpotCard"
import { GalleryImage as GalleryImageComponent } from "@/components/GalleryImage"
import { ImageModal } from "@/components/ImageModal"
import { useScrollPosition } from "@/hooks/useScrollPosition"
import type { JSX } from "react"

// Define types for data structures
interface NavigationItem {
  id: string
  label: string
  icon: JSX.Element
  variant?: "default" | "green" | "pink" | "yellow" | "blue"
}

interface GalleryCategory {
  id: string
  label: string
  icon: string
}

interface GalleryImageProps {
  id: number
  src: string
  title: string
  description: string
  category: string
  location: string
}

interface RecommendedSpot {
  name: string
  description: string
  image: string
  rating: number
}

interface SpotCardProps {
  title: string
  description: string
  image: string
  category: string
}

export default function KabukichoWebsite() {
  // State management
  const [activeSection, setActiveSection] = useState("hero")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [galleryCategory, setGalleryCategory] = useState("all")

  // Use custom hook for scroll position
  const { y: scrollY } = useScrollPosition({ throttleMs: 100 })
  const isScrolled = scrollY > 50

  // Navigation items with color variants
  const navigationItems: NavigationItem[] = useMemo(
    () => [
      { id: "hero", label: "トップ", icon: <Sparkles className="w-5 h-5" />, variant: "pink" },
      { id: "history", label: "歌舞伎町の歴史", icon: <History className="w-5 h-5" />, variant: "purple" },
      { id: "nightlife", label: "夜のエンタメ", icon: <Lightbulb className="w-5 h-5" />, variant: "yellow" },
      { id: "gourmet", label: "絶品グルメ", icon: <Utensils className="w-5 h-5" />, variant: "blue" },
      { id: "gallery", label: "フォトギャラリー", icon: <Camera className="w-5 h-5" />, variant: "green" },
      { id: "hidden", label: "秘密の場所", icon: <Search className="w-5 h-5" />, variant: "pink" },
    ],
    [],
  )

  // Gallery categories
  const galleryCategories: GalleryCategory[] = useMemo(
    () => [
      { id: "all", label: "すべて", icon: "🌟" },
      { id: "neon", label: "ネオンサイン", icon: "💡" },
      { id: "street", label: "ストリート風景", icon: "🛣️" },
      { id: "night", label: "夜景", icon: "🌙" },
      { id: "architecture", label: "建築物", icon: "🏢" },
    ],
    [],
  )

  // Gallery images data
  const galleryImages: GalleryImageProps[] = useMemo(
    () => [
      {
        id: 1,
        src: "/深夜のラーメン.jpg",
        title: "ネオン煌めく一番街",
        description: "歌舞伎町の象徴的なゲートと、奥へと続くネオンの洪水。",
        category: "neon",
        location: "歌舞伎町一番街",
      },
      {
        id: 2,
        src: "/IMG_5789.jpg",
        title: "昭和ノスタルジー ゴールデン街",
        description: "狭い路地にひしめく小さなバーが、独特の雰囲気を醸し出す。",
        category: "street",
        location: "新宿ゴールデン街",
      },
      {
        id: 3,
        src: "/夜景.jpg",
        title: "歌舞伎町タワーと夜景",
        description: "新たなランドマーク、歌舞伎町タワーが夜空に聳え立つ。",
        category: "architecture",
        location: "歌舞伎町タワー",
      },
      {
        id: 4,
        src: "/ロボット.jpg",
        title: "ロボットレストランの入口",
        description: "ド派手な外観が目を引く、世界的にも有名なエンタメスポット。※現在休業中",
        category: "neon",
        location: "ロボットレストラン",
      },
      {
        id: 5,
        src: "/赤提灯.jpg",
        title: "思い出横丁の赤提灯",
        description: "煙と活気に包まれた、昔ながらの飲み屋街。",
        category: "street",
        location: "思い出横丁",
      },
      
      // {
      //   id: 7,
      //   src: "/パチンコ2.jpg",
      //   title: "深夜の屋台グルメ",
      //   description: "夜遅くまで賑わう屋台で味わう、絶品B級グルメ。",
      //   category: "street",
      //   location: "歌舞伎町エリア",
      // },
      {
        id: 8,
        src: "/ネオン.jpg",
        title: "ネオンサインコレクション",
        description: "歌舞伎町を彩る、個性的でアーティスティックなネオンサインの数々。",
        category: "neon",
        location: "歌舞伎町各所",
      },
      {
        id: 9,
        src: "/パチンコ2.jpg",
        title: "深夜の歌舞伎町",
        description: "夜が更けても眠らない街の活気あふれる風景。",
        category: "night",
        location: "歌舞伎町中央通り",
      },
      {
        id: 10,
        src: "/パチンコ2.jpg",
        title: "ゴールデン街の路地",
        description: "狭い路地に並ぶ個性的な店舗群。",
        category: "street",
        location: "新宿ゴールデン街",
      },
      // {
      //   id: 11,
      //   src: "/パチンコ2.jpg",
      //   title: "タワーからの眺望",
      //   description: "歌舞伎町タワーから見下ろす夜の街並み。",
      //   category: "architecture",
      //   location: "歌舞伎町タワー展望台",
      // },
      // {
      //   id: 12,
      //   src: "/パチンコ2.jpg",
      //   title: "エンタメの殿堂",
      //   description: "色とりどりのネオンが踊る、エンターテイメントの聖地。",
      //   category: "neon",
      //   location: "歌舞伎町エンタメエリア",
      // },
    ],
    [],
  )

  // Recommended spots data
  const recommendedSpots: RecommendedSpot[] = useMemo(
    () => [
      {
        name: "新宿ゴールデン街",
        description: "昭和の面影を残す、個性的なバーが集まるエリア。",
        image: "/IMG_5789.jpg",
        rating: 4.8,
      },
      {
        name: "歌舞伎町タワー",
        description: "エンタメ複合施設。ホテルや映画館、ライブホールも。",
        image: "/パチンコ2.jpg",
        rating: 4.7,
      },
      {
        name: "思い出横丁",
        description: "焼き鳥の煙が立ち込める、風情ある飲み屋街。",
        image: "/パチンコ2.jpg",
        rating: 4.6,
      },
    ],
    [],
  )

  // Spot cards data
  const spotCards: SpotCardProps[] = useMemo(
    () => [
      {
        title: "サムライミュージアム",
        description: "日本の武士道精神に触れる。甲冑試着や殺陣ショーも人気。 ※現在休業中",
        image: "/images/spots/museum.jpg",
        category: "文化体験",
      },
      {
        title: "テルマー湯",
        description: "都会のオアシス。天然温泉や岩盤浴でリフレッシュ。",
        image: "/images/spots/oyu.jpg",
        category: "リラクゼーション",
      },
      // {
      //   title: "VR ZONE SHINJUKU跡地周辺",
      //   description: "最新VRやエンタメが集まるエリア。常に新しい刺激が。",
      //   image: "/パチンコ2.jpg",
      //   category: "エンターテイメント",
      // },
      {
        title: "新宿ゴールデン街",
        description: "昭和の面影を残す、個性的なバーが集まるエリア。深夜まで賑わう大人の社交場。",
        image: "/IMG_5789.jpg",
        category: "ナイトライフ",
      },
      {
        title: "歌舞伎町タワー",
        description: "エンタメ複合施設。ホテルや映画館、ライブホールも。新時代の歌舞伎町のシンボル。",
        image: "/歌舞伎町タワー.jpg",
        category: "ランドマーク",
      },
      {
        title: "思い出横丁",
        description: "焼き鳥の煙が立ち込める、風情ある飲み屋街。昭和レトロな雰囲気が魅力。",
        image: "/images/spots/omoi.jpg",
        category: "グルメ",
      },
//       {
//   // "title": "SHOW CLUB nest",
//   // "description": "歌舞伎町でも異彩を放つ、本格的なポールダンスやバーレスクショーが楽しめる大人のエンターテイメントクラブ。きらびやかなステージと迫力あるパフォーマンスが魅力。",
//   // "image": "",
//   // "category": "エンターテイメント"
// },
// {
//   // "title": "ひげガール",
//   // "description": "個性豊かなニューハーフタレントたちが繰り広げる、抱腹絶倒のトークと華やかなショーが大人気の老舗ショーパブ。笑いと感動に満ちた、忘れられない夜を約束します。",
//   // "image": "",
//   // "category": "エンターテイメント"
// }
    ],
    [],
  )

  // Filter gallery images based on selected category
  const filteredImages = useMemo(
    () => (galleryCategory === "all" ? galleryImages : galleryImages.filter((img) => img.category === galleryCategory)),
    [galleryCategory, galleryImages],
  )

  // Image modal handlers
  const openImageModal = useCallback((imageId: number) => {
    setSelectedImage(imageId)
  }, [])

  const closeImageModal = useCallback(() => {
    setSelectedImage(null)
  }, [])

  const navigateImage = useCallback(
    (direction: "prev" | "next") => {
      if (selectedImage === null) return

      const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage)
      let newIndex

      if (direction === "prev") {
        newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1
      } else {
        newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0
      }

      setSelectedImage(filteredImages[newIndex].id)
    },
    [selectedImage, filteredImages],
  )

  // Smooth scroll to section
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(id)
      setMobileMenuOpen(false)
    }
  }, [])

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map((item) => item.id)

      // Find the current section in view
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          // If the section is in view (with some buffer for better UX)
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [navigationItems])

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined" && window.innerWidth >= 1280 && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [mobileMenuOpen])

  return (
    <div className="min-h-screen bg-black text-gray-100 relative overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Floating Neon Orbs */}
      <FloatingNeonOrbs />

      {/* Neon Lines */}
      <NeonLines />

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-[60] xl:hidden bg-black border border-purple-500 hover:shadow-[0_0_10px_rgba(168,85,247,0.5)]"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileMenuOpen}
        aria-controls="mobile-menu"
      >
        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Left Sidebar - Fixed Navigation */}
      <aside
        id="mobile-menu"
        className={`
          fixed top-0 left-0 h-screen w-80 bg-black z-50
          transition-transform duration-300 ease-in-out
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          xl:translate-x-0
          flex flex-col
        `}
        aria-hidden={typeof window !== "undefined" && !mobileMenuOpen && window.innerWidth < 1280}
      >
        <div className="p-6 text-center">
          <h1 className="text-3xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent leading-tight heading-orbitron-bold">
            KABUKICHO
          </h1>
          <p className="text-xs text-gray-400 mt-2 tracking-wider font-medium">THE VIBRANT NIGHT</p>
        </div>

        <nav className="flex-grow p-6 space-y-3 overflow-y-auto scrollbar-thin scrollbar-track-black/20 scrollbar-thumb-purple-500/50">
          {navigationItems.map((item) => (
            <NeonNavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              isActive={activeSection === item.id}
              onClick={() => scrollToSection(item.id)}
              variant={item.variant}
            />
          ))}
        </nav>

        <div className="p-6 space-y-4">
          <h3 className="text-sm font-semibold text-pink-400 tracking-wider">イチオシスポット</h3>
          {recommendedSpots.slice(0, 2).map((spot, index) => (
            <Card
              key={index}
              className="bg-black border border-transparent hover:border-purple-500 hover:shadow-[0_0_10px_rgba(168,85,247,0.5)] transition-all duration-300"
            >
              <CardContent className="p-3">
                <div className="flex space-x-3 items-center">
                  <LazyImage
                    src={spot.image}
                    alt={spot.name}
                    className="w-12 h-12 rounded-md object-cover transition-transform duration-300"
                    width={48}
                    height={48}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-xs text-white group-hover:text-pink-300 transition-colors truncate">
                      {spot.name}
                    </h4>
                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{spot.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </aside>

      {/* Main Content Area - With proper margin for fixed sidebar */}
      <div className="xl:ml-80 relative z-10">
        <main>
          {/* Hero Section - Pure Black Background */}
          {/* Hero Section - 优化间距和过渡 */}
          <section id="hero" className="hero-section relative text-center section-padding bg-black">
            {/* Hero Content */}
            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-8 md:mb-12 lg:mb-16 leading-tight tracking-tighter">
                {/* Enhanced with customizable properties */}
                <NeonTubeTextLight
                  className="block mb-4 md:mb-6 lg:mb-8 heading-orbitron-bold"
                  color="pink"
                  fontFamily="monoton"
                  animationType="breathing"
                  intensity="medium"
                >
                  眠らない街
                </NeonTubeTextLight>

                <NeonTubeTextLightBlue
                  className="block text-zen-kaku"
                  fontFamily="gothic"
                  animationType="breathing"
                  intensity="medium"
                >
                  歌舞伎町へ
                </NeonTubeTextLightBlue>
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-12 md:mb-16 lg:mb-20 max-w-2xl mx-auto leading-relaxed font-light">
                東京の夜を支配する、光と影の迷宮。
                <br className="hidden md:block" />
                未知なる体験が、あなたを待っている。
              </p>
              <NeonButton
                variant="purple"
                size="lg"
                onClick={() => scrollToSection("nightlife")}
                className=" mt-8 rounded-full  flex items-center animate-breathing"
              >
                
                夜を探検する
              </NeonButton>
            </div>

            {/* 添加向下滚动指示器 */}
            <div className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-purple-500/50 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-purple-500 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </section>

          {/* Content Sections */}
          <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-20 md:py-28 lg:py-32 space-y-40 md:space-y-48 lg:space-y-56 xl:space-y-64 bg-black">
            {/* History Section */}
            <ParallaxSection speed={0.1}>
              <section id="history" className="max-w-5xl mx-auto">
                <h2 className="section-title text-purple-300 mb-16 md:mb-20 lg:mb-24 heading-orbitron">
                  <History className="inline-block w-10 h-10 mr-4" />
                  歌舞伎町の歴史：再生と変貌の物語
                </h2>
                <Card className="card-neon">
                  <CardContent className="p-8 md:p-12 lg:p-16 text-gray-300 leading-relaxed space-y-8 text-lg md:text-xl">
                    <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-pink-400 first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                      かつて湿地帯だったこの地は、戦後の灰燼の中から「文化の街」を目指して再生されました。1948年、歌舞伎座誘致計画にちなんで「歌舞伎町」と命名。しかし、財政難で歌舞伎座は幻となり、代わりに映画館やスケート場が建設され、エンターテイメントの街としての一歩を踏み出します。
                    </p>
                    <p className="indent-8">
                      高度経済成長期には、ディスコやクラブが次々とオープンし、若者文化の発信地に。しかし、バブル崩壊後は治安が悪化し、「怖い街」のイメージも定着しました。
                    </p>
                    <p className="indent-8">
                      2000年代以降、行政と地元住民による浄化作戦や再開発が進み、安全で多様な魅力を持つ街へと変貌を遂げています。歌舞伎町タワーの開業は、その象徴と言えるでしょう。
                    </p>
                    <blockquote className="border-l-4 border-purple-500 pl-6 italic text-purple-200 bg-purple-900/20 p-4 rounded-r-lg">
                      「常に時代を映し出し、変化し続ける歌舞伎町。そのダイナミズムこそが、人々を惹きつけてやまない魅力の源泉なのです。」
                    </blockquote>
                  </CardContent>
                </Card>
              </section>
            </ParallaxSection>

            {/* Nightlife Section */}
            <ParallaxSection speed={0.15}>
              <section id="nightlife" className="max-w-6xl mx-auto">
                <h2 className="section-title text-pink-300 mb-16 md:mb-20 lg:mb-24 heading-orbitron">
                  <Lightbulb className="inline-block w-10 h-10 mr-4" />
                  夜のエンターテイメント：五感を刺激する体験
                </h2>
                <p className="text-center text-gray-400 text-lg md:text-xl mb-20 md:mb-24 lg:mb-28 max-w-3xl mx-auto leading-relaxed">
                  歌舞伎町の夜は、あらゆる感覚を刺激する体験で満ちています。
                  <br />
                  伝統と革新が交差する、唯一無二のエンターテイメント空間をご紹介します。
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-fr">
                  {spotCards.map((spot, index) => (
                    <SpotCardComponent key={index} spot={spot} index={index} />
                  ))}
                </div>
              </section>
            </ParallaxSection>

            {/* Gourmet Section */}
            <ParallaxSection speed={0.08}>
              <section id="gourmet" className="max-w-5xl mx-auto">
                <h2 className="section-title text-blue-300 mb-16 md:mb-20 lg:mb-24 heading-orbitron">
                  <Utensils className="inline-block w-10 h-10 mr-4" />
                  絶品グルメ：眠らない街の胃袋を満たす
                </h2>
                <div className="space-y-12">
                  <Card className="card-neon pulse-neon overflow-hidden">
                    <CardContent className="p-0">
                      <div className="lg:flex">
                        <div className="lg:w-2/5">
                          <LazyImage
                            src="/パチンコ2.jpg"
                            alt="深夜のラーメン"
                            className="w-full h-64 lg:h-full object-cover neon-glow-blue"
                          />
                        </div>
                        <div className="lg:w-3/5 p-10 md:p-12">
                          <h3 className="text-3xl lg:text-4xl font-bold text-blue-300 mb-6 text-glow tracking-tight leading-tight heading-orbitron">
                            24時間戦える！
                            <br />
                            深夜メシの聖地
                          </h3>
                          <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
                            <p>
                              歌舞伎町は食のるつぼ。高級寿司からB級グルメまで、あらゆるジャンルの味が24時間あなたを待っています。
                            </p>
                            <p>
                              終電を逃しても大丈夫。熱々のラーメン、ジューシーな焼肉、心温まる居酒屋料理が、疲れた心と体を癒してくれるでしょう。
                            </p>
                            <div className="flex items-center text-blue-400 neon-glow bg-blue-900/20 p-4 rounded-lg">
                              <Clock className="w-6 h-6 mr-3 animate-spin flex-shrink-0" />
                              <span className="font-medium">多くの店が深夜・早朝まで営業中</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </ParallaxSection>

            {/* Gallery Section */}
            <ParallaxSection speed={0.12}>
              <section id="gallery" className="max-w-8xl mx-auto">
                <div className="text-center mb-20 md:mb-24 lg:mb-28">
                  <h2 className="section-title text-pink-400 mb-8 md:mb-10 lg:mb-12 heading-orbitron">
                    <Camera className="inline-block w-10 h-10 mr-4" />
                    フォトギャラリー：歌舞伎町の万華鏡
                  </h2>
                  <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                    光と影が織りなす、歌舞伎町の多彩な表情。
                    <br />
                    ネオンの海、路地裏のドラマ、人々の喧騒。
                    <br />
                    一瞬を切り取った写真たちが、この街の物語を語ります。
                  </p>
                </div>

                {/* 分類篩選按鈕 - 優化布局 */}
                <div className="mb-20 md:mb-24 lg:mb-28">
                  <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
                    {galleryCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setGalleryCategory(category.id)}
                        className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 text-sm font-medium tracking-wider bg-black border backdrop-blur-sm
                          ${
                            galleryCategory === category.id
                              ? "border-pink-400 text-pink-300 shadow-[0_0_15px_rgba(244,114,182,0.5),0_0_25px_rgba(244,114,182,0.3)] scale-105"
                              : "border-gray-600 text-gray-300 hover:border-pink-400 hover:text-pink-300 hover:shadow-[0_0_10px_rgba(244,114,182,0.3)] hover:scale-105"
                          }`}
                        aria-pressed={galleryCategory === category.id}
                      >
                        <span className="mr-2 text-base" aria-hidden="true">
                          {category.icon}
                        </span>
                        <span className="whitespace-nowrap">{category.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* 顯示當前分類的圖片數量 */}
                  <div className="text-center mt-6">
                    <p className="text-gray-500 text-sm">
                      {filteredImages.length} 枚の写真
                      {galleryCategory !== "all" && (
                        <span className="ml-2 text-pink-400">
                          ({galleryCategories.find((cat) => cat.id === galleryCategory)?.label})
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* 圖片網格 - 優化響應式布局 */}
                <div className="gallery-grid">
                  {filteredImages.map((image, index) => (
                    <GalleryImageComponent key={image.id} image={image} index={index} openImageModal={openImageModal} />
                  ))}
                </div>
              </section>
            </ParallaxSection>

            {/* Hidden Spots Section */}
            <ParallaxSection speed={0.05}>
              <section id="hidden" className="max-w-5xl mx-auto">
                <h2 className="section-title text-green-300 mb-16 md:mb-20 lg:mb-24 heading-orbitron">
                  <Search className="inline-block w-10 h-10 mr-4" />
                  秘密の場所：通だけが知る歌舞伎町
                </h2>
                <Card className="card-neon neon-glow-blue overflow-hidden">
                  <CardContent className="p-8 md:p-12 lg:p-16 text-gray-300 leading-relaxed space-y-8 text-lg md:text-xl">
                    <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-green-400 first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                      喧騒の裏には、まだ知られざる歌舞伎町の顔が隠されています。一本路地を入れば、そこはまるで別世界。
                    </p>
                    <div className="grid md:grid-cols-2 gap-8 my-8">
                      <div className="space-y-4">
                        <h4 className="text-xl font-semibold text-green-300 neon-text">隠れ家スポット</h4>
                        <ul className="space-y-2 text-base">
                          <li className="flex items-center">
                            <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                            個性的なマスターが営む隠れ家バー
                          </li>
                          <li className="flex items-center">
                            <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                            地元民に愛される老舗食堂
                          </li>
                          <li className="flex items-center">
                            <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                            アートな空間が広がる小さなギャラリー
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-xl font-semibold text-green-300 neon-text">探索のコツ</h4>
                        <p className="text-base">
                          ガイドブックには載っていない、あなただけの「秘密の場所」を見つけるのも歌舞伎町散策の醍醐味。勇気を出して扉を開けば、忘れられない出会いや発見が待っています。
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center text-green-400 neon-glow bg-green-900/20 p-6 rounded-lg">
                      <MapPin className="w-8 h-8 mr-4 animate-bounce flex-shrink-0" />
                      <span className="font-medium text-lg">自分だけの宝物を探しに出かけよう</span>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </ParallaxSection>
          </div>
        </main>
      </div>

      {/* Image Modal */}
      <ImageModal
        selectedImage={selectedImage}
        images={galleryImages}
        closeModal={closeImageModal}
        navigateImage={navigateImage}
      />

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 xl:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
