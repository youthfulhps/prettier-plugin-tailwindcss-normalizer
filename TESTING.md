# 🧪 테스트 가이드

이 문서는 `prettier-plugin-tailwindcss-normalizer`를 다양한 방법으로 테스트하는 방법을 설명합니다.

## 🚀 빠른 시작

### 1. 로컬 테스트 (가장 간단함)

```bash
# 1단계: 테스트 패키지 생성
npm run test:local

# 2단계: 테스트 프로젝트로 이동
cd ../your-test-project

# 3단계: 생성된 .tgz 파일로 설치
npm install ../prettier-plugin-tailwindcss-normalizer/prettier-plugin-tailwindcss-normalizer-*.tgz
```

### 2. npm link 사용

```bash
# 1단계: 플러그인 프로젝트에서
npm run test:link

# 2단계: 테스트 프로젝트에서
cd ../your-test-project
npm link prettier-plugin-tailwindcss-normalizer
```

## 📦 GitHub Actions를 통한 배포 테스트

### GitHub Packages (Private 배포)

1. GitHub Actions 탭으로 이동
2. "Test Deploy to GitHub Packages" 워크플로우 선택
3. "Run workflow" 클릭
4. 버전 suffix 입력 (예: `alpha.1`, `beta.2`)
5. 실행 후 Artifacts에서 설치 가이드 다운로드

### 로컬 테스트 패키지 생성

1. GitHub Actions 탭으로 이동
2. "Generate Local Test Package" 워크플로우 선택
3. "Run workflow" 클릭
4. 테스트 방법 선택 (npm-pack 추천)
5. Artifacts에서 패키지와 가이드 다운로드

## 🧪 테스트 방법

### 테스트 파일 생성

`test.jsx` 또는 `test.tsx` 파일을 만듭니다:

```jsx
import React from "react";

const TestComponent = () => {
  return (
    <div className="w-[384px] h-[256px] p-[16px] m-[24px]">
      <div className="bg-[#ff0000] text-[18px] border-[2px] rounded-[8px]">
        <span className="px-[12px] py-[8px] ml-[4px]">테스트 텍스트</span>
      </div>
      <div className="max-w-[768px] min-h-[100px] gap-[16px]">
        더 많은 테스트 케이스
      </div>
    </div>
  );
};

export default TestComponent;
```

### Prettier 설정

`.prettierrc.json` 파일에 플러그인을 추가합니다:

```json
{
  "plugins": ["prettier-plugin-tailwindcss-normalizer"],
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

### 테스트 실행

```bash
# 단일 파일 테스트
npx prettier --write test.jsx

# 전체 프로젝트 테스트 (주의: 백업 권장)
npx prettier --write "src/**/*.{js,jsx,ts,tsx}"
```

### 예상 결과

```jsx
import React from "react";

const TestComponent = () => {
  return (
    <div className="w-sm h-64 p-4 m-6">
      <div className="bg-[#ff0000] text-lg border-2 rounded-lg">
        <span className="px-3 py-2 ml-1">테스트 텍스트</span>
      </div>
      <div className="max-w-3xl min-h-[100px] gap-4">더 많은 테스트 케이스</div>
    </div>
  );
};

export default TestComponent;
```

## 🔧 문제 해결

### 플러그인이 작동하지 않을 때

1. **빌드 확인**

   ```bash
   npm run build
   ls -la dist/  # index.js, index.d.ts 확인
   ```

2. **Prettier 설정 확인**

   ```bash
   npx prettier --version
   npx prettier --help | grep plugins
   ```

3. **캐시 클리어**
   ```bash
   rm -rf node_modules/.cache
   # VSCode 사용 시: Command Palette → "Reload Window"
   ```

### VSCode에서 테스트

1. VSCode에서 Prettier extension 설치
2. 설정에서 "Format On Save" 활성화
3. 테스트 파일 저장 시 자동 포맷팅 확인

### 자세한 로그 확인

```bash
# 디버그 모드로 실행
DEBUG=prettier:* npx prettier --write test.jsx
```

## 📊 테스트 케이스

다양한 값들을 테스트해보세요:

```jsx
// spacing (padding, margin)
<div className="p-[16px] px-[24px] py-[8px] pt-[12px] pr-[20px] pb-[32px] pl-[4px]" />
<div className="m-[16px] mx-[24px] my-[8px] mt-[12px] mr-[20px] mb-[32px] ml-[4px]" />

// sizing
<div className="w-[384px] h-[256px] max-w-[768px] min-h-[100px]" />

// borders & rounded
<div className="border-[2px] border-r-[4px] rounded-[8px] rounded-t-[12px]" />

// colors (이건 변환되지 않음 - 정상)
<div className="bg-[#ff0000] text-[#00ff00] border-[#0000ff]" />

// 복합적인 경우
<div className="w-[448px] h-[320px] p-[24px] m-[16px] border-[1px] rounded-[4px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]" />
```

## 🚀 다음 단계

테스트가 완료되면:

1. 이슈나 개선사항을 GitHub Issues에 보고
2. 실제 프로젝트에 적용하기 전에 충분한 테스트
3. 팀과 공유하여 더 많은 테스트 케이스 수집

---

💡 **팁**: 테스트 전에 항상 코드를 백업하세요!
📝 **피드백**: 문제가 발생하면 GitHub Issues에 보고해주세요.
