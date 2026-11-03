import {
  createElement,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react"

type Screen = "compare" | "create" | "discovery" | "home" | "plan" | "memory"
type CreatedTrip = {
  name: string
  startDate: string
  endDate: string
  destination: string
}
type Spot = {
  id: number
  time: string
  title: string
  detail: string
  kind: string
  latitude?: number
  longitude?: number
}
type ModelPlan = {
  id: string
  area: string
  title: string
  days: string
  theme: string
  description: string
  image: string
}
type IconName = "home" | "map" | "photo" | "calendar" | "arrow" | "plus" | "grip" | "clock" | "close" | "check" | "route" | "search"

const photos = {
  hero: "/images/kyoto-hero.jpg",
  path: "/images/green-path.jpg",
  window: "/images/cafe-window.jpg",
  street: "/images/kyoto-street.jpg",
  mountains:
    "https://images.unsplash.com/photo-1595270470419-863bd4e1c78c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxKYXBhbmVzZSUyMHRyYXZlbCUyMGZvcmVzdCUyMGZyaWVuZHMlMjBzY2VuaWN8ZW58MXx8fHwxNzkyMDcxMzE0fDA&ixlib=rb-4.1.0&q=80&w=1080",
  onsen:
    "https://images.unsplash.com/photo-1783613770534-e3d94ca6c6e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxKYXBhbiUyMHRyYXZlbCUyMG9uc2VuJTIwbW91bnRhaW4lMjBzY2VuaWN8ZW58MXx8fHwxNzkyMzY3MTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080",
}

const modelPlans: ModelPlan[] = [
  {
    id: "kyoto",
    area: "京都",
    title: "静かな古都をめぐる、二泊三日",
    days: "2泊3日",
    theme: "街歩き · カフェ",
    description:
      "朝の路地から夕暮れの川辺まで。京都らしい時間をゆっくり味わうコース。",
    image: photos.hero,
  },
  {
    id: "okinawa",
    area: "沖縄",
    title: "島の青に会いにいく週末",
    days: "2泊3日",
    theme: "海 · リラックス",
    description: "海風を感じるドライブと、島のごはんを楽しむ小さな逃避行。",
    image: photos.window,
  },
  {
    id: "hokkaido",
    area: "北海道",
    title: "大地と温泉、冬のごほうび旅",
    days: "2泊3日",
    theme: "絶景 · 温泉",
    description: "白い大地の景色と、湯けむりの中で深呼吸する週末。",
    image: photos.mountains,
  },
  {
    id: "kanazawa",
    area: "金沢",
    title: "工芸と甘味をめぐる街歩き",
    days: "1泊2日",
    theme: "グルメ · 街歩き",
    description: "古い街並みを歩いて、器と甘いものに出会う旅。",
    image: photos.street,
  },
  {
    id: "hakone",
    area: "箱根",
    title: "森と湖の、休日ドライブ",
    days: "1泊2日",
    theme: "ドライブ · 温泉",
    description: "緑の道を抜けて、湖のそばでのんびり過ごす旅。",
    image: photos.path,
  },
  {
    id: "izu",
    area: "伊豆",
    title: "海辺の小さなロードトリップ",
    days: "1泊2日",
    theme: "海 · ドライブ",
    description: "窓を開けて海岸線へ。夕日を追いかける気ままなコース。",
    image: photos.onsen,
  },
]

const initialSpots: Spot[] = [
  {
    id: 1,
    time: "10:00",
    title: "京都駅",
    detail: "旅のはじまり・荷物を預ける",
    kind: "移動",
    latitude: 34.98585,
    longitude: 135.75877,
  },
  {
    id: 2,
    time: "11:30",
    title: "南禅寺",
    detail: "水路閣と紅葉を散歩",
    kind: "見る",
    latitude: 35.01166,
    longitude: 135.79306,
  },
  {
    id: 3,
    time: "14:00",
    title: "喫茶ソワレ",
    detail: "ゼリーポンチでひと休み",
    kind: "食べる",
    latitude: 35.003,
    longitude: 135.7702,
  },
  {
    id: 4,
    time: "16:30",
    title: "鴨川デルタ",
    detail: "夕暮れまでのんびり",
    kind: "見る",
    latitude: 35.0302,
    longitude: 135.772,
  },
]

function Icon({
  name,
  className = "size-5",
}: {
  name: IconName
  className?: string
}) {
  const paths: Record<IconName, ReactNode> = {
    home: (
      <path d="M3 10.8 12 3l9 7.8v9.7a.5.5 0 0 1-.5.5H15v-7H9v7H3.5a.5.5 0 0 1-.5-.5v-9.7Z" />
    ),
    map: (
      <>
        <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" />
        <path d="M9 3v15m6-12v15" />
      </>
    ),
    photo: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="10" r="2" />
        <path d="m21 15-5-5L5 20" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    arrow: <path d="m9 18 6-6-6-6" />,
    plus: <path d="M12 5v14M5 12h14" />,
    grip: (
      <>
        <circle cx="9" cy="7" r="1" fill="currentColor" />
        <circle cx="15" cy="7" r="1" fill="currentColor" />
        <circle cx="9" cy="12" r="1" fill="currentColor" />
        <circle cx="15" cy="12" r="1" fill="currentColor" />
        <circle cx="9" cy="17" r="1" fill="currentColor" />
        <circle cx="15" cy="17" r="1" fill="currentColor" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    close: <path d="m6 6 12 12M18 6 6 18" />,
    check: <path d="m5 12 4 4L19 6" />,
    search: (
      <>
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 4.5 4.5" />
      </>
    ),
    route: (
      <>
        <circle cx="6" cy="18" r="2" />
        <circle cx="18" cy="6" r="2" />
        <path d="M8 18h3a3 3 0 0 0 3-3v-6a3 3 0 0 1 3-3" />
      </>
    ),
  }
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

function Button({
  children,
  onClick,
  className = "",
  label,
  type = "button",
  style,
}: {
  children: ReactNode
  onClick?: () => void
  className?: string
  label?: string
  type?: "button" | "submit"
  style?: CSSProperties
}) {
  return createElement(
    "button",
    { type, onClick, className, style, "aria-label": label },
    children,
  )
}

function Brand() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="grid size-9 place-items-center rounded-full bg-emerald-950 text-white">
        <Icon name="route" className="size-4" />
      </div>
      <p className="font-serif text-xl tracking-tight text-stone-900">
        Roamnote
      </p>
    </div>
  )
}

function Header({ onAvatar }: { onAvatar: () => void }) {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 lg:px-8">
      <Brand />
      <Button
        onClick={onAvatar}
        className="flex items-center -space-x-2 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:ring-offset-2"
        label="ふたりのプロフィール"
      >
        <span className="grid size-9 place-items-center rounded-full border-2 border-stone-50 bg-amber-100 text-xs font-bold text-amber-900">
          M
        </span>
        <span className="grid size-9 place-items-center rounded-full border-2 border-stone-50 bg-sky-100 text-xs font-bold text-sky-900">
          Y
        </span>
      </Button>
    </header>
  )
}

function BottomNav({
  screen,
  setScreen,
}: {
  screen: Screen
  setScreen: (screen: Screen) => void
}) {
  const items: { id: Screen; label: string; icon: IconName }[] = [
    { id: "home", label: "ホーム", icon: "home" },
    { id: "plan", label: "計画", icon: "map" },
    { id: "memory", label: "思い出", icon: "photo" },
  ]
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-stone-50/95 px-6 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl lg:top-5 lg:right-8 lg:bottom-auto lg:left-auto lg:rounded-full lg:border lg:px-2 lg:py-2 lg:shadow-lg">
      <div className="mx-auto flex max-w-md justify-around gap-2">
        {items.map((item) => (
          <Button
            key={item.id}
            onClick={() => setScreen(item.id)}
            className={`flex min-w-20 flex-col items-center gap-1 rounded-full px-4 py-2 text-xs transition lg:min-w-0 lg:flex-row lg:text-sm ${
              screen === item.id
                ? "bg-emerald-950 text-white"
                : "text-stone-500 hover:bg-stone-200 hover:text-stone-900"
            }`}
          >
            <Icon name={item.icon} className="size-5" />
            <span>{item.label}</span>
          </Button>
        ))}
      </div>
    </nav>
  )
}

type DesignDirection = "photo" | "journal" | "utility"

const directions: {
  id: DesignDirection
  label: string
  eyebrow: string
  description: string
}[] = [
  {
    id: "photo",
    label: "A. 写真中心型",
    eyebrow: "AIRBNB-LIKE",
    description: "余白と大きな写真で、旅への憧れをつくる。",
  },
  {
    id: "journal",
    label: "B. ジャーナル型",
    eyebrow: "TRAVEL JOURNAL",
    description: "記録をページのように重ね、思い出を育てる。",
  },
  {
    id: "utility",
    label: "C. 実用型",
    eyebrow: "TRIP ORGANIZER",
    description: "次の行動へ迷わず進める、整理された旅の拠点。",
  },
]

function PrototypeNav({
  active = "home",
}: {
  active?: "home" | "plan" | "memory"
}) {
  return (
    <div className="mt-auto flex items-center justify-around border-t border-black/8 px-4 pb-4 pt-3 text-[9px] text-stone-400">
      {[
        ["home", "ホーム"],
        ["plan", "計画"],
        ["memory", "記録"],
      ].map(([id, label]) => (
        <span
          key={id}
          className={`flex flex-col items-center gap-1 ${
            active === id ? "font-bold text-stone-900" : ""
          }`}
        >
          <span
            className={`size-1.5 rounded-full ${
              active === id ? "bg-emerald-800" : "bg-stone-300"
            }`}
          />
          {label}
        </span>
      ))}
    </div>
  )
}

function PhotoHome({
  hasTrips,
  onCreate,
  trip,
}: {
  hasTrips: boolean
  onCreate: () => void
  trip: CreatedTrip | null
}) {
  return (
    <div className="flex min-h-[39rem] flex-col bg-white">
      <div className="flex items-center justify-between px-5 pt-5">
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-full bg-emerald-950 text-white">
            <Icon name="route" className="size-3.5" />
          </span>
          <span className="font-serif text-base tracking-tight">Roamnote</span>
        </div>
        <div className="flex -space-x-2">
          <span className="grid size-7 place-items-center rounded-full border-2 border-white bg-amber-100 text-[8px] font-bold text-amber-900">
            M
          </span>
          <span className="grid size-7 place-items-center rounded-full border-2 border-white bg-sky-100 text-[8px] font-bold text-sky-900">
            Y
          </span>
          <span className="grid size-7 place-items-center rounded-full border-2 border-white bg-emerald-100 text-[8px] font-bold text-emerald-900">
            S
          </span>
        </div>
      </div>
      {hasTrips ? (
        <>
          <div className="flex items-end justify-between px-5 pb-4 pt-8">
            <div>
              <p className="text-[10px] font-bold tracking-[0.18em] text-emerald-800">
                NEXT JOURNEY
              </p>
              <p className="mt-1 font-serif text-[1.7rem] leading-tight">
                次の旅が待っている。
              </p>
            </div>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold text-emerald-800">
              あと24日
            </span>
          </div>
          <div className="mx-5 overflow-hidden rounded-[1.6rem] shadow-[0_12px_30px_rgba(21,43,36,.16)]">
            <div className="relative aspect-[1.08/1]">
              <img
                src={photos.hero}
                alt="京都の通りを歩く旅行者"
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <p className="font-serif text-[1.45rem]">
                  {trip?.name ?? "秋の京都、みんな旅"}
                </p>
                <p className="mt-1.5 text-[10px] text-white/80">
                  {trip?.startDate || trip?.endDate
                    ? `${trip.startDate || "日程未定"} — ${trip.endDate || "日程未定"}`
                    : "11月22日（金）— 24日（日）"}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-white/25 pt-3">
                  <span className="text-[10px]">7スポットを計画中</span>
                  <span className="flex items-center gap-1 text-[10px] font-bold">
                    計画を見る <Icon name="arrow" className="size-3" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between px-5 pt-6">
            <div>
              <p className="font-serif text-lg">思い出をめくる</p>
              <p className="mt-0.5 text-[10px] text-stone-400">
                これまでの旅 8件
              </p>
            </div>
            <span className="text-[10px] font-bold text-emerald-800">
              すべて見る
            </span>
          </div>
          <div className="flex gap-3 overflow-hidden px-5 pt-3">
            <div className="relative h-24 min-w-[63%] overflow-hidden rounded-2xl">
              <img
                src={photos.path}
                alt="新緑の上高地"
                className="size-full object-cover"
              />
              <p className="absolute bottom-2 left-2.5 text-[10px] font-bold text-white">
                新緑の上高地
              </p>
            </div>
            <div className="relative h-24 min-w-[45%] overflow-hidden rounded-2xl">
              <img
                src={photos.street}
                alt="冬の金沢さんぽ"
                className="size-full object-cover"
              />
              <p className="absolute bottom-2 left-2.5 text-[10px] font-bold text-white">
                冬の金沢
              </p>
            </div>
          </div>
          <Button
            onClick={onCreate}
            className="mx-5 mt-5 flex w-[calc(100%-2.5rem)] items-center justify-center gap-1.5 rounded-full border border-emerald-950 py-2.5 text-[10px] font-bold text-emerald-950"
          >
            <Icon name="plus" className="size-3.5" />
            旅行を作る
          </Button>
        </>
      ) : (
        <>
          <div className="px-5 pb-4 pt-9">
            <p className="text-[10px] font-bold tracking-[0.18em] text-emerald-800">
              A NEW ADVENTURE
            </p>
            <p className="mt-2 font-serif text-[1.8rem] leading-[1.32]">
              次は、どこへ行こう？
            </p>
            <p className="mt-2 text-[11px] leading-5 text-stone-500">
              まだ見ぬ景色も、いつもの仲間と。
            </p>
          </div>
          <div className="relative mx-5 overflow-hidden rounded-[1.7rem] shadow-[0_12px_26px_rgba(21,43,36,.16)]">
            <img
              src={photos.mountains}
              alt="新しい旅への期待を感じる緑の山並み"
              className="h-60 w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/65 via-transparent to-transparent" />
            <p className="absolute bottom-4 left-4 font-serif text-xl text-white">
              思い立った日が、
              <br />
              旅のはじまり。
            </p>
          </div>
          <Button
            onClick={onCreate}
            className="mx-5 mt-5 flex w-[calc(100%-2.5rem)] items-center justify-center gap-2 rounded-full bg-emerald-950 py-3.5 text-xs font-bold text-white shadow-lg shadow-emerald-950/20"
          >
            <Icon name="plus" className="size-4" />
            旅行を作る
          </Button>
          <p className="mt-4 text-center text-[10px] text-stone-400">
            行き先も日程も、あとから決められます
          </p>
        </>
      )}
      <PrototypeNav />
    </div>
  )
}

function JournalHome({ hasTrips }: { hasTrips: boolean }) {
  return (
    <div className="flex min-h-[33rem] flex-col bg-[#f5f1e9] text-[#413a33]">
      <div className="flex items-center justify-between px-5 pt-5">
        <span className="font-serif text-base italic">Roamnote</span>
        <span className="text-[10px] tracking-widest text-stone-500">
          OUR NOTES
        </span>
      </div>
      {hasTrips ? (
        <>
          <div className="px-5 pt-7">
            <p className="text-[10px] tracking-[0.18em] text-[#9d6f51]">
              RECENTLY ADDED
            </p>
            <p className="mt-2 font-serif text-2xl">ふたりの旅のページ</p>
          </div>
          <article className="mx-5 mt-5 rotate-[-1deg] bg-white p-3 shadow-[0_8px_20px_rgba(74,58,43,.12)]">
            <img
              src={photos.path}
              alt=""
              className="h-32 w-full object-cover sepia-[.12]"
            />
            <p className="mt-3 font-serif text-lg">新緑の上高地</p>
            <p className="mt-1 text-[10px] text-stone-500">
              2024.05.18 — 19 · 32 photos
            </p>
            <div className="mt-3 border-t border-dashed border-stone-300 pt-2 font-serif text-[11px] italic text-stone-500">
              雨上がりの、静かな朝。
            </div>
          </article>
          <div className="mx-5 mt-6 flex items-center gap-3 border-t border-[#d8d0c3] pt-4">
            <img
              src={photos.hero}
              alt=""
              className="size-12 rounded-full object-cover"
            />
            <div>
              <p className="text-[10px] tracking-widest text-[#9d6f51]">
                NEXT PAGE
              </p>
              <p className="mt-1 font-serif text-base">秋の京都、ふたり旅</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="px-5 pt-11">
            <p className="text-[10px] tracking-[0.18em] text-[#9d6f51]">
              A BLANK PAGE
            </p>
            <p className="mt-3 font-serif text-[1.7rem] leading-[1.4]">
              まだ白いページに、
              <br />
              最初の旅を書こう。
            </p>
          </div>
          <div className="mx-5 mt-7 border border-[#d8d0c3] bg-[#fbfaf6] p-4 shadow-[5px_6px_0_#e5ded2]">
            <div className="h-24 border-b border-dashed border-[#d8d0c3] bg-[repeating-linear-gradient(0deg,transparent,transparent_23px,#e5ded2_24px)]" />
            <p className="mt-3 font-serif text-sm italic text-stone-400">
              行きたい場所、いつ行く？
            </p>
          </div>
          <p className="mx-5 mt-6 text-center text-[11px] text-stone-500">
            旅の計画も、帰ってからの記録も。
            <br />
            ふたりだけのノートに残ります。
          </p>
        </>
      )}
      <PrototypeNav active="memory" />
    </div>
  )
}

function UtilityHome({ hasTrips }: { hasTrips: boolean }) {
  return (
    <div className="flex min-h-[33rem] flex-col bg-white">
      <div className="flex items-center justify-between border-b border-stone-100 px-5 py-5">
        <span className="font-serif text-base">Roamnote</span>
        <span className="grid size-7 place-items-center rounded-full bg-stone-100 text-[10px] font-bold">
          MY
        </span>
      </div>
      {hasTrips ? (
        <>
          <div className="px-5 pt-6">
            <p className="text-xl font-bold">次の旅行</p>
          </div>
          <div className="mx-5 mt-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-bold">秋の京都、ふたり旅</p>
                <p className="mt-1 text-[11px] text-stone-500">
                  11/22（金）— 11/24（日） · 2泊3日
                </p>
              </div>
              <span className="rounded-full bg-white px-2 py-1 text-[10px] font-bold text-emerald-800">
                あと24日
              </span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-emerald-100 pt-3 text-center text-[10px]">
              <span>
                <b className="block text-sm">7</b>スポット
              </span>
              <span>
                <b className="block text-sm">3</b>日間
              </span>
              <span>
                <b className="block text-sm">2</b>メンバー
              </span>
            </div>
          </div>
          <div className="px-5 pt-7">
            <div className="flex items-center justify-between">
              <p className="text-base font-bold">旅行一覧</p>
              <p className="text-[10px] text-emerald-800">全8件</p>
            </div>
            <div className="mt-3 divide-y divide-stone-100 border-y border-stone-100">
              {[
                ["新緑の上高地", "2024.05.18 — 19", "記録32件"],
                ["冬の金沢さんぽ", "2024.01.13 — 14", "記録46件"],
              ].map(([title, date, count]) => (
                <div
                  key={title}
                  className="flex items-center justify-between py-3"
                >
                  <div>
                    <p className="text-xs font-bold">{title}</p>
                    <p className="mt-1 text-[10px] text-stone-400">{date}</p>
                  </div>
                  <p className="text-[10px] text-stone-500">{count}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="px-5 pt-8">
            <p className="text-xl font-bold">旅行一覧</p>
            <p className="mt-1 text-[11px] text-stone-500">
              ふたりの旅行を、まとめて管理できます。
            </p>
          </div>
          <div className="mx-5 mt-6 grid place-items-center rounded-2xl border border-dashed border-stone-300 py-12 text-center">
            <span className="grid size-11 place-items-center rounded-full bg-stone-100 text-xl text-stone-400">
              +
            </span>
            <p className="mt-4 text-sm font-bold">最初の旅行を登録</p>
            <p className="mt-1 text-[10px] text-stone-500">
              日程や行きたい場所を追加しましょう
            </p>
          </div>
          <div className="mx-5 mt-5 rounded-xl bg-stone-50 p-3">
            <p className="text-[10px] font-bold text-stone-600">
              Roamnoteでできること
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[9px] text-stone-500">
              <span>日程を整理</span>
              <span>スポット共有</span>
              <span>写真を記録</span>
            </div>
          </div>
        </>
      )}
      <PrototypeNav active="plan" />
    </div>
  )
}

function DirectionFrame({
  direction,
  hasTrips,
}: {
  direction: DesignDirection
  hasTrips: boolean
}) {
  if (direction === "photo")
    return <PhotoHome hasTrips={hasTrips} onCreate={() => {}} trip={null} />
  if (direction === "journal") return <JournalHome hasTrips={hasTrips} />
  return <UtilityHome hasTrips={hasTrips} />
}

function ComparisonHome({
  openPrototype,
  openCreate,
  trip,
}: {
  openPrototype: () => void
  openCreate: () => void
  trip: CreatedTrip | null
}) {
  const [hasTrips, setHasTrips] = useState(true)
  return (
    <main className="min-h-screen bg-[#e9e6df] px-5 py-7 text-stone-900 sm:px-8 lg:px-12 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="text-xs font-bold tracking-[0.18em] text-emerald-800">
              ROAMNOTE · A / PHOTO-FIRST HOME
            </p>
            <p className="mt-2 font-serif text-3xl leading-tight sm:text-4xl">
              写真から、旅がはじまる。
              <br className="sm:hidden" />
              みんなの記憶がつながる。
            </p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-stone-500">
              大きな景色を主役に、計画へ進む期待と、思い出をめくる余白を両立したホーム画面です。
            </p>
          </div>
          <Button
            onClick={openPrototype}
            className="rounded-full border border-stone-300 bg-white px-4 py-2.5 text-xs font-bold text-stone-700 shadow-sm"
          >
            既存プロトタイプを開く
          </Button>
        </div>
        <div className="mt-8 flex items-center justify-between border-y border-stone-300 py-3">
          <p className="text-xs font-bold text-stone-600">表示する状態</p>
          <div className="rounded-full bg-white p-1 shadow-sm">
            <Button
              onClick={() => setHasTrips(false)}
              className={`rounded-full px-3 py-1.5 text-[11px] ${
                !hasTrips ? "bg-emerald-950 text-white" : "text-stone-500"
              }`}
            >
              未登録
            </Button>
            <Button
              onClick={() => setHasTrips(true)}
              className={`rounded-full px-3 py-1.5 text-[11px] ${
                hasTrips ? "bg-emerald-950 text-white" : "text-stone-500"
              }`}
            >
              旅行あり
            </Button>
          </div>
        </div>
        <div className="mx-auto mt-8 grid max-w-4xl items-center gap-8 lg:grid-cols-[1fr_22rem_1fr]">
          <div className="order-2 text-center lg:order-1 lg:text-right">
            <p className="text-[10px] font-bold tracking-[0.16em] text-emerald-800">
              PHOTO-FIRST
            </p>
            <p className="mt-2 font-serif text-2xl">
              {hasTrips ? "次の旅を主役に" : "まだ見ぬ景色を主役に"}
            </p>
            <p className="mt-3 text-xs leading-6 text-stone-500">
              {hasTrips
                ? "日程、スポット数、参加メンバーは写真の余韻を損なわない位置に整理。計画と過去の記録へ自然につながります。"
                : "空のカードを置かず、ひとつの風景と明快な作成ボタンだけで、最初の一歩を後押しします。"}
            </p>
          </div>
          <div className="order-1 overflow-hidden rounded-[2rem] border-[7px] border-stone-900 bg-white shadow-[0_16px_35px_rgba(48,43,36,.18)] lg:order-2">
            <PhotoHome
              hasTrips={hasTrips || Boolean(trip)}
              onCreate={openCreate}
              trip={trip}
            />
          </div>
          <div className="order-3 rounded-2xl border border-white/75 bg-white/50 p-5 text-center lg:text-left">
            <p className="text-[10px] font-bold tracking-[0.16em] text-emerald-800">
              DESIGN NOTES
            </p>
            <ul className="mt-3 space-y-3 text-xs leading-5 text-stone-600">
              <li>深いグリーンで、写真に静かな輪郭を。</li>
              <li>友達・家族にもなじむ、複数人の表現。</li>
              <li>「計画」「記録」へは下部ナビから。</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}

function Home({
  goPlan,
  openCreate,
  trip,
  onIdea,
}: {
  goPlan: () => void
  openCreate: () => void
  trip: CreatedTrip | null
  onIdea: (title: string) => void
}) {
  const ideas = [
    {
      title: "富士山と温泉",
      days: "1泊2日",
      theme: "絶景 · 温泉",
      image: photos.mountains,
    },
    {
      title: "金沢の街歩き",
      days: "2泊3日",
      theme: "街歩き · グルメ",
      image: photos.street,
    },
    {
      title: "伊豆ドライブ",
      days: "1泊2日",
      theme: "ドライブ · 海",
      image: photos.onsen,
    },
  ]
  return (
    <main className="mx-auto w-full max-w-6xl px-5 pb-32 lg:px-8">
      <section className="mb-7 mt-6 lg:mt-14">
        <p className="mb-2 text-sm font-medium text-emerald-800">
          おかえりなさい
        </p>
        <p className="font-serif text-3xl leading-tight text-stone-900 sm:text-4xl">
          次は、どこへ行こう。
        </p>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <p className="font-serif text-xl text-stone-900">次の旅行</p>
          {trip && (
            <Button
              onClick={openCreate}
              className="text-xs font-bold text-emerald-800"
            >
              ＋ 新しい旅行
            </Button>
          )}
        </div>
        {trip ? (
          <Button
            onClick={goPlan}
            className="group relative block min-h-64 w-full overflow-hidden rounded-3xl text-left shadow-xl shadow-stone-300/40"
          >
            <img
              src={photos.hero}
              alt="京都の通りを歩く旅行者"
              className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <div className="mb-3 inline-flex rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium backdrop-blur-md">
                計画をはじめよう
              </div>
              <p className="font-serif text-3xl">{trip.name}</p>
              <div className="mt-3 flex items-center justify-between text-sm text-white/80">
                <span>
                  {trip.startDate || trip.endDate
                    ? `${trip.startDate || "日程未定"} — ${trip.endDate || "日程未定"}`
                    : "日程未定"}
                </span>
                <span className="flex items-center gap-1">
                  計画を見る <Icon name="arrow" className="size-4" />
                </span>
              </div>
            </div>
          </Button>
        ) : (
          <div className="flex items-center justify-between rounded-2xl border border-emerald-100 bg-emerald-50/60 px-5 py-4">
            <div>
              <p className="text-sm font-bold text-stone-800">
                次の旅をつくりませんか？
              </p>
              <p className="mt-1 text-xs text-stone-500">
                行き先や日程は、あとから決められます。
              </p>
            </div>
            <Button
              onClick={openCreate}
              className="grid size-10 shrink-0 place-items-center rounded-full bg-emerald-950 text-white"
              label="旅行を作る"
            >
              <Icon name="plus" />
            </Button>
          </div>
        )}
      </section>
      <section className="mt-10">
        <div className="mb-4">
          <p className="font-serif text-2xl text-stone-900">
            次はどこへ行こう？
          </p>
          <p className="mt-1 text-xs text-stone-500">
            週末から楽しめる、旅のアイデア
          </p>
        </div>
        <div className="-mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-2 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0">
          {ideas.map((idea) => (
            <Button
              key={idea.title}
              onClick={() => onIdea(idea.title)}
              className="group w-64 shrink-0 snap-start overflow-hidden rounded-2xl bg-white text-left shadow-sm ring-1 ring-stone-200 transition hover:-translate-y-1 hover:shadow-lg lg:w-auto"
            >
              <img
                src={idea.image}
                alt={idea.title}
                className="aspect-[1.32/1] w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="block p-4">
                <span className="block font-serif text-xl text-stone-900">
                  {idea.title}
                </span>
                <span className="mt-2 flex items-center justify-between text-xs text-stone-500">
                  <span>{idea.days}</span>
                  <span>{idea.theme}</span>
                </span>
              </span>
            </Button>
          ))}
        </div>
      </section>
      <section className="mt-10">
        <p className="font-serif text-xl text-stone-900">テーマから探す</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {["温泉", "グルメ", "ドライブ", "絶景", "街歩き"].map((theme) => (
            <Button
              key={theme}
              onClick={() => onIdea(theme)}
              className="flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2.5 text-xs font-bold text-stone-600 transition hover:border-emerald-800 hover:text-emerald-800"
            >
              <span className="size-1.5 rounded-full bg-emerald-700" />
              {theme}
            </Button>
          ))}
        </div>
      </section>
    </main>
  )
}

function DiscoveryHome({
  trip,
  goPlan,
  openCreate,
  openModel,
}: {
  trip: CreatedTrip | null
  goPlan: () => void
  openCreate: () => void
  openModel: (plan: ModelPlan) => void
}) {
  return (
    <main className="mx-auto w-full max-w-7xl px-5 pb-32 lg:px-8">
      <section className="mt-6 lg:mt-12">
        <p className="text-sm font-medium text-emerald-800">
          旅のアイデアを見つけよう
        </p>
        <p className="mt-1 font-serif text-3xl leading-tight sm:text-4xl">
          次は、どこへ行こう。
        </p>
        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-3 shadow-sm">
          <Icon name="search" className="size-5 text-emerald-800" />
          <span className="text-sm text-stone-400">どこへ旅したい？</span>
        </div>
        <div className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-1 lg:mx-0 lg:px-0">
          {["温泉", "グルメ", "絶景", "ドライブ", "街歩き", "海"].map(
            (theme) => (
              <Button
                key={theme}
                className="shrink-0 rounded-full border border-stone-200 bg-white px-4 py-2 text-xs font-bold text-stone-600 transition hover:border-emerald-800 hover:text-emerald-800"
              >
                {theme}
              </Button>
            ),
          )}
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="font-serif text-2xl">おすすめの旅行プラン</p>
            <p className="mt-1 text-xs text-stone-500">
              今の気分に合う、週末のモデルコース
            </p>
          </div>
          <p className="text-xs font-bold text-emerald-800">すべて見る</p>
        </div>
        <div className="-mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-2 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0">
          {modelPlans.map((plan) => (
            <Button
              key={plan.id}
              onClick={() => openModel(plan)}
              className="group w-[17.5rem] shrink-0 snap-start overflow-hidden rounded-3xl bg-white text-left shadow-sm ring-1 ring-stone-200 transition hover:-translate-y-1 hover:shadow-lg lg:w-auto"
            >
              <div className="relative aspect-[1.1/1] overflow-hidden">
                <img
                  src={plan.image}
                  alt={plan.title}
                  className="size-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-emerald-900 backdrop-blur">
                  {plan.area}
                </span>
              </div>
              <span className="block p-4">
                <span className="block font-serif text-xl text-stone-900">
                  {plan.title}
                </span>
                <span className="mt-2 block text-xs leading-5 text-stone-500">
                  {plan.description}
                </span>
                <span className="mt-3 flex items-center justify-between border-t border-stone-100 pt-3 text-[11px] font-bold text-emerald-800">
                  <span>{plan.days}</span>
                  <span>{plan.theme}</span>
                </span>
              </span>
            </Button>
          ))}
        </div>
      </section>

      <section className="mt-11">
        <p className="font-serif text-2xl">週末に行きたい旅</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {modelPlans.slice(3, 5).map((plan) => (
            <Button
              key={plan.id}
              onClick={() => openModel(plan)}
              className="group relative min-h-48 overflow-hidden rounded-3xl text-left"
            >
              <img
                src={plan.image}
                alt={plan.title}
                className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/10 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-5 text-white">
                <span className="text-xs text-white/75">{plan.theme}</span>
                <span className="mt-1 block font-serif text-2xl">
                  {plan.title}
                </span>
                <span className="mt-2 block text-xs text-white/80">
                  {plan.days}
                </span>
              </span>
            </Button>
          ))}
        </div>
      </section>

      <section className="mt-11 border-t border-stone-200 pt-8">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-serif text-2xl">自分たちの旅行</p>
          <Button
            onClick={openCreate}
            className="text-xs font-bold text-emerald-800"
          >
            ＋ 旅行を作る
          </Button>
        </div>
        {trip ? (
          <Button
            onClick={goPlan}
            className="flex w-full items-center gap-4 rounded-2xl bg-emerald-50 p-4 text-left ring-1 ring-emerald-100"
          >
            <img
              src={photos.hero}
              alt=""
              className="size-16 rounded-xl object-cover"
            />
            <span className="flex-1">
              <span className="block text-xs font-bold text-emerald-800">
                NEXT JOURNEY
              </span>
              <span className="mt-1 block font-serif text-lg">{trip.name}</span>
              <span className="mt-1 block text-xs text-stone-500">
                {trip.startDate || "日程未定"}
              </span>
            </span>
            <Icon name="arrow" className="text-emerald-800" />
          </Button>
        ) : (
          <Button
            onClick={openCreate}
            className="flex w-full items-center justify-between rounded-2xl border border-dashed border-stone-300 px-5 py-5 text-left"
          >
            <span>
              <span className="block text-sm font-bold">最初の旅をつくる</span>
              <span className="mt-1 block text-xs text-stone-500">
                予定はあとから、みんなで決められます。
              </span>
            </span>
            <span className="grid size-10 place-items-center rounded-full bg-emerald-950 text-white">
              <Icon name="plus" />
            </span>
          </Button>
        )}
      </section>
    </main>
  )
}

function ModelPlanDetail({
  plan,
  back,
  openCreate,
}: {
  plan: ModelPlan
  back: () => void
  openCreate: () => void
}) {
  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl bg-white pb-32">
      <div className="relative h-80 overflow-hidden">
        <img
          src={plan.image}
          alt={plan.title}
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/85 via-transparent to-transparent" />
        <Button
          onClick={back}
          className="absolute left-5 top-5 grid size-10 place-items-center rounded-full bg-white/90 text-stone-900 shadow-sm"
          label="戻る"
        >
          <span className="text-2xl leading-none">‹</span>
        </Button>
        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
          <p className="text-xs font-bold tracking-widest text-white/75">
            {plan.area} · {plan.theme}
          </p>
          <p className="mt-2 font-serif text-3xl leading-tight">{plan.title}</p>
        </div>
      </div>
      <div className="px-5 pt-7">
        <div className="flex gap-3 border-y border-stone-200 py-4 text-center text-xs">
          <span className="flex-1">
            <b className="block text-base text-emerald-900">{plan.days}</b>
            旅の目安
          </span>
          <span className="flex-1">
            <b className="block text-base text-emerald-900">3</b>
            おすすめの立ち寄り
          </span>
          <span className="flex-1">
            <b className="block text-base text-emerald-900">のんびり</b>
            旅のペース
          </span>
        </div>
        <p className="mt-7 font-serif text-2xl">この旅について</p>
        <p className="mt-3 text-sm leading-7 text-stone-600">
          {plan.description}{" "}
          気になる場所を追加して、自分たちらしい予定に整えてみましょう。
        </p>
        <p className="mt-8 text-xs font-bold tracking-widest text-emerald-800">
          MODEL COURSE
        </p>
        <div className="mt-3 space-y-3">
          {["朝の景色を楽しむ", "その土地らしいランチ", "夕暮れの散歩"].map(
            (stop, index) => (
              <div
                key={stop}
                className="flex gap-4 rounded-2xl bg-stone-50 p-4"
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-emerald-950 text-xs font-bold text-white">
                  {index + 1}
                </span>
                <span className="text-sm font-bold text-stone-800">{stop}</span>
              </div>
            ),
          )}
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 border-t border-stone-200 bg-white/95 p-4 backdrop-blur">
        <div className="mx-auto max-w-3xl">
          <Button
            onClick={openCreate}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-950 py-4 text-sm font-bold text-white shadow-lg"
          >
            この旅を参考に旅行を作る <Icon name="arrow" className="size-4" />
          </Button>
        </div>
      </div>
    </main>
  )
}

function MapPanel({
  active,
  spots,
  setActive,
}: {
  active: number
  spots: Spot[]
  setActive: (index: number) => void
}) {
  const [mapAvailable, setMapAvailable] = useState(true)
  const mappedSpots = spots
    .map((spot, index) => ({ ...spot, index }))
    .filter(
      (spot) => spot.latitude !== undefined && spot.longitude !== undefined,
    )
  const point = (latitude: number, longitude: number) => {
    const zoom = 14
    const tileX = ((longitude + 180) / 360) * 2 ** zoom
    const tileY =
      ((1 - Math.asinh(Math.tan((latitude * Math.PI) / 180)) / Math.PI) / 2) *
      2 ** zoom
    return { x: ((tileX - 14369) / 4) * 100, y: ((tileY - 6487) / 4) * 100 }
  }
  const routePoints = mappedSpots.map((spot) =>
    point(spot.latitude!, spot.longitude!),
  )
  return (
    <div className="relative h-72 overflow-hidden rounded-3xl bg-stone-100 lg:h-full lg:min-h-[42rem]">
      {mapAvailable ? (
        <>
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-90">
            {Array.from({ length: 16 }, (_, index) => {
              const x = 14369 + (index % 4)
              const y = 6487 + Math.floor(index / 4)
              return (
                <img
                  key={`${x}-${y}`}
                  src={`https://tile.openstreetmap.org/14/${x}/${y}.png`}
                  alt=""
                  onError={() => setMapAvailable(false)}
                  className="size-full object-cover"
                />
              )
            })}
          </div>
          <div className="absolute inset-0 bg-emerald-950/5" />
          <svg
            className="pointer-events-none absolute inset-0 size-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polyline
              points={routePoints
                .map((routePoint) => `${routePoint.x},${routePoint.y}`)
                .join(" ")}
              fill="none"
              stroke="rgba(6, 78, 59, .8)"
              strokeWidth="0.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          {mappedSpots.map((spot) => {
            const position = point(spot.latitude!, spot.longitude!)
            const selected = active === spot.index
            return (
              <Button
                key={spot.id}
                onClick={() => setActive(spot.index)}
                label={`${spot.index + 1}. ${spot.title}`}
                className={`absolute z-10 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white text-sm font-bold shadow-lg transition ${
                  selected
                    ? "scale-125 bg-amber-400 text-stone-900 ring-4 ring-amber-200/70"
                    : "bg-emerald-950 text-white hover:scale-110"
                }`}
                style={{ left: `${position.x}%`, top: `${position.y}%` }}
              >
                {spot.index + 1}
              </Button>
            )
          })}
          <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-2 text-[10px] font-medium text-stone-700 shadow-sm backdrop-blur">
            OpenStreetMap · 直線で予定順を表示
          </div>
        </>
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-stone-100 p-8 text-center">
          <div>
            <Icon name="map" className="mx-auto size-7 text-emerald-800" />
            <p className="mt-3 text-sm font-bold text-stone-800">
              地図を読み込めませんでした
            </p>
            <p className="mt-1 text-xs leading-5 text-stone-500">
              ネットワーク接続を確認すると、スポットの位置と順番を表示できます。
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

function Plan({
  spots,
  setSpots,
  openAdd,
  trip,
}: {
  spots: typeof initialSpots
  setSpots: (spots: typeof initialSpots) => void
  openAdd: () => void
  trip?: CreatedTrip | null
}) {
  const [active, setActive] = useState(1)
  const move = (index: number, direction: number) => {
    const next = [...spots]
    const target = index + direction
    if (target < 0 || target >= next.length) return
    ;[next[index], next[target]] = [next[target], next[index]]
    setSpots(next)
  }
  return (
    <main className="mx-auto w-full max-w-6xl px-5 pb-32 lg:px-8">
      <div className="mb-6 mt-6 flex items-end justify-between lg:mt-14">
        <div>
          <p className="mb-2 text-sm font-medium text-emerald-800">
            {trip?.startDate ? `${trip.startDate}・1日目` : "日程未定・1日目"}
          </p>
          <p className="font-serif text-3xl text-stone-900">
            {trip?.destination || trip?.name || "京都を歩く"}
          </p>
        </div>
        <Button
          onClick={openAdd}
          className="grid size-12 place-items-center rounded-full bg-emerald-950 text-white shadow-lg transition hover:scale-105"
          label="スポットを追加"
        >
          <Icon name="plus" />
        </Button>
      </div>
      <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
        {["11/22 金", "11/23 土", "11/24 日"].map((date, i) => (
          <Button
            key={date}
            className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium ${
              i === 0
                ? "bg-emerald-950 text-white"
                : "bg-white text-stone-500 ring-1 ring-stone-200"
            }`}
          >
            {date}
          </Button>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <MapPanel active={active} spots={spots} setActive={setActive} />
        <div className="space-y-3">
          {spots.map((spot, index) => (
            <Button
              key={spot.id}
              onClick={() => setActive(index)}
              className={`group flex w-full items-stretch rounded-2xl bg-white text-left shadow-sm ring-1 transition ${
                active === index
                  ? "ring-2 ring-emerald-800"
                  : "ring-stone-200 hover:ring-stone-400"
              }`}
            >
              <span className="flex w-16 shrink-0 flex-col items-center justify-center border-r border-stone-100 text-xs font-bold text-stone-500">
                <span>{spot.time}</span>
                <span className="mt-2 grid size-6 place-items-center rounded-full bg-emerald-950 text-white">
                  {index + 1}
                </span>
              </span>
              <span className="flex flex-1 items-center justify-between gap-3 p-4">
                <span>
                  <span className="mb-1 block text-xs font-medium text-emerald-700">
                    {spot.kind}
                  </span>
                  <span className="block font-serif text-lg text-stone-900">
                    {spot.title}
                  </span>
                  <span className="mt-1 block text-xs text-stone-400">
                    {spot.detail}
                  </span>
                </span>
                <span className="flex flex-col">
                  <span
                    onClick={(e) => {
                      e.stopPropagation()
                      move(index, -1)
                    }}
                    className="px-2 text-center text-stone-400 hover:text-stone-900"
                  >
                    ↑
                  </span>
                  <Icon name="grip" className="size-5 text-stone-300" />
                  <span
                    onClick={(e) => {
                      e.stopPropagation()
                      move(index, 1)
                    }}
                    className="px-2 text-center text-stone-400 hover:text-stone-900"
                  >
                    ↓
                  </span>
                </span>
              </span>
            </Button>
          ))}
        </div>
      </div>
    </main>
  )
}

function Memory() {
  const [album, setAlbum] = useState(false)
  const images = [
    photos.path,
    photos.window,
    photos.street,
    photos.hero,
    photos.window,
    photos.path,
  ]
  return (
    <main className="mx-auto w-full max-w-6xl pb-32">
      <div className="px-5 lg:px-8">
        <div className="mb-6 mt-6 lg:mt-14">
          <p className="mb-2 text-sm font-medium text-emerald-800">
            2024年5月18日 — 19日
          </p>
          <p className="font-serif text-3xl text-stone-900 sm:text-4xl">
            新緑の上高地
          </p>
          <p className="mt-3 max-w-xl text-sm leading-7 text-stone-500">
            雨上がりの森と、朝の澄んだ空気。ふたりで歩いた道をもう一度。
          </p>
        </div>
        <div className="mb-8 inline-flex rounded-full bg-stone-200 p-1">
          <Button
            onClick={() => setAlbum(false)}
            className={`rounded-full px-5 py-2 text-sm transition ${
              !album ? "bg-white text-stone-900 shadow-sm" : "text-stone-500"
            }`}
          >
            タイムライン
          </Button>
          <Button
            onClick={() => setAlbum(true)}
            className={`rounded-full px-5 py-2 text-sm transition ${
              album ? "bg-white text-stone-900 shadow-sm" : "text-stone-500"
            }`}
          >
            アルバム 32
          </Button>
        </div>
      </div>
      {album ? (
        <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:gap-3 lg:px-8">
          {images.map((image, i) => (
            <img
              key={`${image}-${i}`}
              src={image}
              alt={`上高地の旅の写真 ${i + 1}`}
              className={`w-full object-cover ${
                i === 0 ? "col-span-2 aspect-[2/1]" : "aspect-square"
              } lg:rounded-2xl`}
            />
          ))}
        </div>
      ) : (
        <div className="px-5 lg:px-8">
          <div className="relative border-l border-stone-300 pl-7 sm:pl-10">
            {[
              {
                time: "09:42",
                title: "大正池に到着",
                text: "雨が上がったばかり。水面に山が映って、しばらく言葉もなく眺めていた。",
                image: photos.path,
              },
              {
                time: "12:15",
                title: "森の中でランチ",
                text: "持ってきたサンドイッチと熱いコーヒー。歩いたあとのごはんは格別。",
                image: photos.window,
              },
              {
                time: "16:30",
                title: "河童橋の夕暮れ",
                text: "今日いちばん好きだった景色。次は秋にも来ようと約束した。",
                image: photos.street,
              },
            ].map((item, index) => (
              <article
                key={item.title}
                className="relative mb-12 grid gap-5 sm:grid-cols-[1fr_1.2fr] sm:items-center"
              >
                <span className="absolute -left-[2.2rem] top-1 size-3 rounded-full border-4 border-stone-50 bg-emerald-800 sm:-left-[2.85rem]" />
                <div className={index % 2 ? "sm:order-2" : ""}>
                  <p className="mb-2 flex items-center gap-2 text-xs font-bold text-emerald-800">
                    <Icon name="clock" className="size-4" />
                    {item.time}
                  </p>
                  <p className="font-serif text-2xl text-stone-900">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-stone-500">
                    {item.text}
                  </p>
                </div>
                <img
                  src={item.image}
                  alt={item.title}
                  className={`aspect-[4/3] w-full rounded-3xl object-cover ${
                    index % 2 ? "sm:order-1" : ""
                  }`}
                />
              </article>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}

function CreateTrip({
  cancel,
  create,
}: {
  cancel: () => void
  create: (trip: CreatedTrip) => void
}) {
  const [name, setName] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [destination, setDestination] = useState("")
  const [nameError, setNameError] = useState("")

  return (
    <main className="mx-auto min-h-screen w-full max-w-xl bg-white px-5 pb-7 pt-5 sm:my-8 sm:min-h-0 sm:rounded-[2rem] sm:px-8 sm:pt-8 sm:shadow-xl">
      <div className="flex items-center justify-between">
        <Button
          onClick={cancel}
          className="flex size-10 items-center justify-center rounded-full bg-stone-100 text-stone-600 transition hover:bg-stone-200"
          label="戻る"
        >
          <span className="text-2xl leading-none">‹</span>
        </Button>
        <p className="text-[10px] font-bold tracking-[0.18em] text-emerald-800">
          NEW TRIP
        </p>
        <span className="w-10" />
      </div>
      <div className="pt-7">
        <p className="font-serif text-[2rem] leading-tight text-stone-900">
          次の旅を計画しよう。
        </p>
        <p className="mt-2 text-sm leading-6 text-stone-500">
          行き先が決まっていなくても大丈夫。旅の名前から、みんなの計画をはじめよう。
        </p>
      </div>
      <div className="relative mt-6 overflow-hidden rounded-[1.5rem]">
        <img
          src={photos.hero}
          alt="京都の通りを歩く旅行者"
          className="h-32 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/65 via-emerald-950/15 to-transparent" />
        <p className="absolute bottom-3 left-4 font-serif text-lg text-white">
          まだ見ぬ景色へ。
        </p>
      </div>
      <form
        className="mt-7"
        onSubmit={(event) => {
          event.preventDefault()
          if (!name.trim()) {
            setNameError("旅の名前を入力してください")
            return
          }
          create({
            name: name.trim(),
            startDate,
            endDate,
            destination: destination.trim(),
          })
        }}
      >
        <label className="block border-b border-stone-300 pb-3 focus-within:border-emerald-800">
          <span className="text-[11px] font-bold tracking-[0.12em] text-emerald-800">
            TRIP NAME{" "}
            <span className="ml-1 tracking-normal text-stone-400">必須</span>
          </span>
          <input
            value={name}
            onChange={(event) => {
              setName(event.target.value)
              if (nameError) setNameError("")
            }}
            placeholder="例：秋の京都旅行"
            aria-describedby={nameError ? "trip-name-error" : undefined}
            className="mt-2 w-full bg-transparent py-1 font-serif text-xl text-stone-900 outline-none placeholder:font-sans placeholder:text-base placeholder:text-stone-300"
          />
          {nameError && (
            <span
              id="trip-name-error"
              role="alert"
              className="mt-2 block text-xs font-medium text-rose-700"
            >
              {nameError}
            </span>
          )}
        </label>
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold tracking-[0.12em] text-emerald-800">
              DATES{" "}
              <span className="ml-1 tracking-normal text-stone-400">任意</span>
            </p>
            {!startDate && !endDate && (
              <p className="text-[11px] text-stone-400">日程未定</p>
            )}
          </div>
          <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
            <label className="relative block">
              <span className="sr-only">開始日</span>
              <Icon
                name="calendar"
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-emerald-800"
              />
              <input
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
                type="date"
                aria-label="開始日"
                className="w-full rounded-xl border border-stone-200 bg-stone-50 py-3 pl-9 pr-2 text-xs text-stone-700 outline-none transition focus:border-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-100"
              />
            </label>
            <span className="text-stone-300">—</span>
            <label className="relative block">
              <span className="sr-only">終了日</span>
              <Icon
                name="calendar"
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-emerald-800"
              />
              <input
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
                type="date"
                aria-label="終了日"
                className="w-full rounded-xl border border-stone-200 bg-stone-50 py-3 pl-9 pr-2 text-xs text-stone-700 outline-none transition focus:border-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-100"
              />
            </label>
          </div>
        </div>
        <label className="mt-6 block">
          <span className="text-[11px] font-bold tracking-[0.12em] text-emerald-800">
            DESTINATION{" "}
            <span className="ml-1 tracking-normal text-stone-400">任意</span>
          </span>
          <span className="relative mt-3 block">
            <Icon
              name="search"
              className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-emerald-800"
            />
            <input
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
              placeholder="主な目的地を入力"
              className="w-full rounded-xl border border-stone-200 bg-stone-50 py-3.5 pl-10 pr-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-100"
            />
          </span>
        </label>
        <div className="sticky bottom-0 -mx-5 mt-7 bg-gradient-to-t from-white via-white pb-1 pt-5 sm:-mx-8 sm:px-8">
          <Button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-950 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-950/20 transition hover:bg-emerald-900"
          >
            旅行を作成
            <Icon name="arrow" className="size-4" />
          </Button>
          <Button
            onClick={cancel}
            className="mt-3 w-full py-2 text-xs font-bold text-stone-500"
          >
            キャンセル
          </Button>
        </div>
      </form>
    </main>
  )
}

function AddSpotModal({ close, add }: { close: () => void; add: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-stone-950/40 p-4 backdrop-blur-sm sm:items-center"
      onClick={close}
    >
      <div
        className="w-full max-w-md rounded-3xl bg-stone-50 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold tracking-widest text-emerald-800">
              ADD A SPOT
            </p>
            <p className="mt-1 font-serif text-2xl text-stone-900">
              次に行く場所
            </p>
          </div>
          <Button
            onClick={close}
            className="grid size-10 place-items-center rounded-full bg-stone-200 text-stone-600"
            label="閉じる"
          >
            <Icon name="close" />
          </Button>
        </div>
        <div className="mb-5 rounded-2xl bg-white p-4 ring-1 ring-stone-200">
          <p className="text-xs font-medium text-stone-400">おすすめスポット</p>
          <p className="mt-2 font-serif text-lg text-stone-900">
            永観堂 禅林寺
          </p>
          <p className="mt-1 text-sm text-stone-500">
            紅葉の名所・南禅寺から徒歩12分
          </p>
        </div>
        <Button
          onClick={add}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-950 py-4 text-sm font-bold text-white shadow-lg"
        >
          <Icon name="plus" className="size-4" />
          このスポットを追加
        </Button>
      </div>
    </div>
  )
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("home")
  const [spots, setSpots] = useState(initialSpots)
  const [modal, setModal] = useState(false)
  const [toast, setToast] = useState("")
  const [createdTrip, setCreatedTrip] = useState<CreatedTrip | null>(null)
  const [selectedModel, setSelectedModel] = useState<ModelPlan | null>(null)

  const notify = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(""), 2200)
  }
  const addSpot = () => {
    setSpots([
      ...spots,
      {
        id: Date.now(),
        time: "18:00",
        title: "永観堂 禅林寺",
        detail: "ライトアップを見に行く",
        kind: "見る",
      },
    ])
    setModal(false)
    notify("スポットを追加しました")
  }
  const createTrip = (trip: CreatedTrip) => {
    setCreatedTrip(trip)
    setScreen("plan")
    notify("旅行を作成しました")
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      {screen === "compare" ? (
        <ComparisonHome
          openPrototype={() => setScreen("home")}
          openCreate={() => setScreen("create")}
          trip={createdTrip}
        />
      ) : screen === "create" ? (
        <CreateTrip cancel={() => setScreen("compare")} create={createTrip} />
      ) : screen === "discovery" && selectedModel ? (
        <ModelPlanDetail
          plan={selectedModel}
          back={() => setScreen("home")}
          openCreate={() => setScreen("create")}
        />
      ) : (
        <>
          <Header onAvatar={() => notify("Mio & Yuta の旅ノート")} />
          {screen === "home" && (
            <DiscoveryHome
              goPlan={() => setScreen("plan")}
              openCreate={() => setScreen("create")}
              trip={createdTrip}
              openModel={(model) => {
                setSelectedModel(model)
                setScreen("discovery")
              }}
            />
          )}
          {screen === "plan" && (
            <Plan
              spots={spots}
              setSpots={setSpots}
              openAdd={() => setModal(true)}
              trip={createdTrip}
            />
          )}
          {screen === "memory" && <Memory />}
          <BottomNav screen={screen} setScreen={setScreen} />
        </>
      )}
      {modal && <AddSpotModal close={() => setModal(false)} add={addSpot} />}
      {toast && (
        <div className="fixed left-1/2 top-5 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-full bg-stone-900 px-5 py-3 text-sm text-white shadow-xl">
          <Icon name="check" className="size-4 text-emerald-300" />
          {toast}
        </div>
      )}
    </div>
  )
}
