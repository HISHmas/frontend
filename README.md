
# 🎄 HISHmas Frontend 개발 환경 & 협업 가이드

> **Next.js + TypeScript + Tailwind 기반의 HISHmas Frontend 개발 팀을 위한 표준 가이드라인입니다.**
> 깔끔한 협업, 안정적인 코드 품질, 일관된 개발 문화를 지향합니다.

---

# 🛠️ 기술 스택

## ⚛️ Language · Framework · Tools

### **Next.js**

* 서버 사이드 렌더링(SSR), 정적 사이트 생성(SSG)을 지원
* App Router 기반으로 페이지 구성
* SEO / 퍼포먼스 최적화에 강점

### **TypeScript**

* 정적 타입 시스템으로 안정성 & 유지보수성 향상
* 대규모 프로젝트에도 견고함 제공

### **React**

* 컴포넌트 기반 UI 구조
* 재사용성 높고, 효율적인 렌더링

### **Tailwind CSS**

* Utility-first CSS Framework
* 빠른 스타일링 + 커스터마이징 유연

### **CSS / SCSS**

* Tailwind로 커버되지 않는 부분을 커스텀 스타일로 보완

### **ESLint + Prettier**

* 코드 규칙 자동 정렬
* 스타일 통일
* 린팅으로 실수 방지

### **Husky**

* Git Hooks을 통해 commit/push 전 자동 검증
* 코드 품질 유지에 필수

---

# ⚙️ CI / CD

### **Vercel** 배포 예정

* GitHub 연동시 자동 배포
* Next.js 공식 최적화 배포 플랫폼
* 미리보기(Preview) URL 자동 생성

---


# 📁 프로젝트 구조 (Project Structure)

> HISHmas Frontend는 기능 기반 폴더 구조(Feature-based Structure)를 따르며,
> **도메인 단위 구분 + 재사용 컴포넌트 분리 + API/Store 독립 관리** 철학으로 구성됩니다.

```
frontend/
├─ public/                     # 정적 파일 (이미지, 폰트 등)
│
├─ src/
│  ├─ api/                     # API 요청 모듈 (도메인별 분리)
│  │  ├─ auth.ts               # 인증 API
│  │  ├─ common.ts             # 공통 fetch/error util
│  │  ├─ letters.ts            # 편지(레터) 관련 API
│  │  ├─ tree.ts               # 트리/오브젝트 관련 API
│  │  └─ useAuthStore.ts       # (정리 예정) 과거 위치의 auth store
│  │
│  ├─ app/                     # Next.js App Router (페이지 구조)
│  │  ├─ auth/                 # 로그인 / 회원가입 관련 라우트
│  │  ├─ tree/                 # 크리스마스 트리 페이지 & 공유 페이지 등
│  │  ├─ globals.css           # 전역 스타일 (Tailwind + Custom CSS)
│  │  ├─ layout.tsx            # 최상위 레이아웃
│  │  └─ page.tsx              # 루트 페이지
│  │
│  ├─ components/              # 공통 UI 컴포넌트
│  │  └─ common/
│  │     └─ LayoutWrapper.tsx  # 모바일 디바이스 레이아웃 Wrapper
│  │
│  ├─ stores/                  # Zustand Store (API 분리 원칙 준수)
│  │  └─ useAuthStore.ts       # 인증 상태 관리
│  │
│  ├─ styles/                  # 전역 스타일/테마
│  │  ├─ index.css             # Tailwind 엔트리 + reset 등
│  │  └─ theme.css             # 컬러/폰트/토큰 등 테마 변수
│  │
│  └─ (기타 설정 파일)
│
├─ .env                        # 환경 변수
├─ .gitignore
└─ package.json / tsconfig / eslint / prettier configs
```

---

## 📌 구조 설계 철학

### 🔹 1. **도메인 기반(Feature-based) 구조**

* 인증(auth), 트리(tree), 편지(letters) 등 기능 단위로 폴더를 구성
* 유지보수 용이 & 기능 추가 시 충돌 최소화

### 🔹 2. **상태 관리(Store)와 API 호출 분리**

* Zustand Store는 상태만 관리 (API 호출 X)
* API 호출은 `src/api/`에서만 처리 → 테스트 및 확장성 향상

### 🔹 3. **Next.js App Router 최적 활용**

* `app/` 내부는 라우팅 · 레이아웃 · 페이지 위주로 구성
* UI 로직은 모두 `components/`로 분리 → 페이지 가독성 향상

### 🔹 4. **Tailwind + Custom CSS 병행**

* 빠른 스타일링은 Tailwind
* 반복적인 스타일/테마는 `theme.css`에서 관리

---
