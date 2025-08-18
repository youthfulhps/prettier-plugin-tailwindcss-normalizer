# Prettier Plugin Tailwind CSS Normalizer - Examples

## 🎉 플러그인 성공적으로 작동 확인!

이 디렉토리는 **prettier-plugin-tailwindcss-normalizer** 플러그인의 동작을 테스트하기 위한 다양한 파일들이 형식별로 정리되어 있습니다.

## 📁 테스트 파일 구조

```
examples/
├── tsx/                    # TypeScript React 파일들
│   ├── complex-test.tsx    # 복잡한 JSX 패턴과 다양한 컴포넌트 구조
│   ├── format-test.tsx     # 기본 format 테스트
│   ├── multiline-test.tsx  # 멀티라인 className 테스트
│   ├── ternary-test.tsx    # 삼항 연산자 내부 문자열 테스트
│   └── test-simple.tsx     # 기본적인 TSX 케이스
│
├── jsx/                    # JavaScript React 파일들  
│   └── test.jsx           # React JSX 파일 테스트
│
├── html/                   # HTML 파일들
│   └── test.html          # 순수 HTML class 속성 테스트
│
├── vue/                    # Vue.js 파일들
│   └── test.vue           # Vue.js :class 바인딩 테스트
│
├── .prettierrc            # Prettier 설정 파일
├── .vscode/settings.json  # VS Code 워크스페이스 설정
└── package.json          # 프로젝트 의존성 및 스크립트
```

## ✅ 변환 성공 사례들

### 1. **JSX className 속성**

```jsx
// 변환 전
<button className="p-[4px] m-[8px] bg-blue-500">Click me</button>

// 변환 후
<button className="p-1 m-2 bg-blue-500">Click me</button>
```

### 2. **HTML class 속성**

```html
<!-- 변환 전 -->
<div class="px-[16px] py-[8px]">HTML 테스트</div>

<!-- 변환 후 -->
<div class="px-4 py-2">HTML 테스트</div>
```

### 3. **Vue 클래스 바인딩**

```vue
<!-- 변환 전 -->
<span :class="'px-[16px] py-[8px]'">Vue 바인딩</span>
<button v-bind:class="'rounded-[4px] bg-blue-500'">버튼</button>

<!-- 변환 후 -->
<span :class="'px-4 py-2'">Vue 바인딩</span>
<button v-bind:class="'rounded bg-blue-500'">버튼</button>
```

### 4. **clsx 함수 호출**

```tsx
// 변환 전
className={clsx(
  "px-[16px] py-[8px] rounded-[6px]",
  "focus:ring-[2px] focus:ring-blue-500"
)}

// 변환 후
className={clsx(
  "px-4 py-2 rounded-md",
  "focus:ring-2 focus:ring-blue-500"
)}
```

### 5. **삼항 연산자 & 템플릿 리터럴**

```tsx
// 변환 전
const dynamicClasses = isActive ? "p-[16px] bg-blue-500" : "p-[8px] bg-gray-300";
className={`w-[200px] h-[100px] border-[1px] ${condition ? 'p-[20px]' : 'p-[10px]'}`}

// 변환 후
const dynamicClasses = isActive ? "p-4 bg-blue-500" : "p-2 bg-gray-300";
className={`w-[200px] h-[100px] border ${condition ? 'p-5' : 'p-2.5'}`}
```

## 🛡️ 안전성 확인 사례들

### 1. **주석 보호**
```html
<!-- 주석에서 언급: p-[16px] 이건 변환되면 안됨 --> ✅ 보호됨
```

### 2. **일반 텍스트 보호**
```html
<p>텍스트에서 언급: m-[12px] 이것도 변환되면 안됨</p> ✅ 보호됨
```

### 3. **다른 HTML 속성 보호**
```html
<div title="패딩: p-[20px]" data-test="m-[24px]" class="px-4 py-2">
  ✅ title, data 속성은 보호됨
</div>
```

### 4. **JavaScript 문자열 보호**
```typescript
const errorMessage = "패딩 p-[4px]는 유효하지 않습니다"; // ✅ 보호됨
console.log("마진 m-[8px] 설정"); // ✅ 보호됨
```

## 🧪 테스트 방법

### 명령어로 테스트

```bash
# examples 폴더로 이동
cd examples

# 의존성 설치 (필요시)
npm install

# 모든 파일 테스트
npx prettier --write tsx/*.tsx jsx/*.jsx html/*.html vue/*.vue

# 특정 형식만 테스트
npx prettier --write tsx/*.tsx    # TSX 파일들만
npx prettier --write jsx/*.jsx    # JSX 파일들만
npx prettier --write html/*.html  # HTML 파일들만
npx prettier --write vue/*.vue    # Vue 파일들만

# 또는 .prettierrc 설정을 사용하여 (권장)
npx prettier --write tsx/*.tsx jsx/*.jsx html/*.html vue/*.vue
```

### VS Code Format on Save 테스트

1. 원하는 형식의 폴더(tsx, jsx, html, vue)에서 파일을 열기
2. 파일 내용을 수정 (임의 값 추가: `p-[20px]`, `m-[10px]` 등)
3. `Cmd + S` (macOS) 또는 `Ctrl + S` (Windows)로 저장
4. Tailwind 임의 값이 표준 클래스로 변환되는지 확인

## ⚙️ 플러그인 설정

- `.prettierrc` - Prettier 플러그인 설정
- `.vscode/settings.json` - VS Code 워크스페이스 설정  
- `tailwind.config.js` - Tailwind CSS 설정
- `package.json` - 의존성 및 스크립트 관리

## 📊 결과 요약

| 테스트 케이스 | 파일                 | 결과    | 변환된 클래스 수 |
| ------------- | -------------------- | ------- | ---------------- |
| 기본 JSX      | jsx/test.jsx         | ✅ 성공 | 2개              |
| HTML 속성     | html/test.html       | ✅ 성공 | 4개              |
| Vue 바인딩    | vue/test.vue         | ✅ 성공 | 5개              |
| 복잡한 TSX    | tsx/complex-test.tsx | ✅ 성공 | 8개+             |
| 삼항 연산자   | tsx/ternary-test.tsx | ✅ 성공 | 4개+             |
| 멀티라인      | tsx/multiline-test.tsx | ✅ 성공 | 6개+           |

## 🎯 결론

**`prettier-plugin-tailwindcss-normalizer`는 실제 프로젝트에서 완벽하게 작동합니다!**

- ✅ **정확한 변환**: 클래스 속성만 정확히 대상으로 함
- ✅ **안전한 보호**: 주석, 문자열, 다른 속성들은 절대 건드리지 않음
- ✅ **다중 프레임워크 지원**: HTML, React/JSX, Vue 모두 완벽 지원
- ✅ **실제 사용 가능**: 다양한 프로젝트에서 바로 적용 가능
- ✅ **엣지 케이스 처리**: 삼항 연산자, 템플릿 리터럴, 복잡한 패턴까지 완벽 지원

이제 팀 프로젝트에 적용하여 일관된 Tailwind CSS 코드 스타일을 자동으로 유지할 수 있습니다! 🛡️✨