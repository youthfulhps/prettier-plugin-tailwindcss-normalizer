# 배포 가이드

이 문서는 `prettier-plugin-tailwindcss-normalizer` 라이브러리를 NPM에 배포하는 방법을 설명합니다.

## 사전 준비

### 1. NPM 토큰 설정

NPM에 패키지를 배포하려면 NPM 토큰이 필요합니다.

1. [npmjs.com](https://www.npmjs.com)에 로그인
2. 프로필 → Access Tokens → Generate New Token
3. "Automation" 타입으로 토큰 생성
4. GitHub 리포지토리 Settings → Secrets and variables → Actions
5. `NPM_TOKEN`이라는 이름으로 시크릿 추가

### 2. 권한 확인

GitHub Actions가 리포지토리에 태그를 생성하고 릴리스를 만들 수 있도록 권한을 설정해야 합니다.

1. Repository Settings → Actions → General
2. "Workflow permissions"에서 "Read and write permissions" 선택
3. "Allow GitHub Actions to create and approve pull requests" 체크

## 배포 방법

### 자동 배포 (권장)

#### 1. 수동 워크플로우 실행

1. GitHub 리포지토리 → Actions → "Release to NPM" 워크플로우 선택
2. "Run workflow" 클릭
3. 배포 옵션 설정:
   - `release_type`: patch/minor/major 선택
   - `dry_run`: 테스트 배포 시 체크

#### 2. GitHub 릴리스 생성

1. GitHub 리포지토리 → Releases → "Create a new release"
2. 태그 이름: `v1.0.0` 형식으로 입력
3. "Publish release" 클릭하면 자동으로 NPM 배포

### 수동 배포

```bash
# 1. 의존성 설치 및 테스트
npm ci
npm run test
npm run lint

# 2. 버전 업데이트
npm version patch  # 또는 minor, major

# 3. 빌드
npm run build

# 4. NPM 로그인
npm login

# 5. 배포
npm publish
```

## 워크플로우 설명

### CI 워크플로우 (`ci.yml`)

- **트리거**: `main`, `develop` 브랜치에 push/PR 시
- **기능**:
  - Node.js 16, 18, 20 버전에서 테스트
  - ESLint로 코드 스타일 검사
  - Jest로 테스트 실행 및 커버리지 측정
  - TypeScript 빌드 검증
  - 패키지 설치 테스트

### Release 워크플로우 (`release.yml`)

- **트리거**:
  - GitHub 릴리스 생성 시 (자동)
  - 수동 워크플로우 실행 시
- **기능**:
  - 전체 테스트 및 빌드 실행
  - 버전 자동 업데이트 (수동 실행 시)
  - NPM 배포
  - GitHub 릴리스 생성 (수동 실행 시)

### 테스트 워크플로우 (`test-workflow.yml`)

- **트리거**: 수동 실행만
- **기능**: 배포 전 워크플로우 테스트

## 배포 체크리스트

배포 전에 다음 사항들을 확인하세요:

- [ ] 모든 테스트가 통과하는지 확인
- [ ] `package.json`의 버전이 올바른지 확인
- [ ] `CHANGELOG.md` 업데이트 (있는 경우)
- [ ] NPM 토큰이 올바르게 설정되었는지 확인
- [ ] 배포할 변경사항이 `main` 브랜치에 있는지 확인

## 트러블슈팅

### NPM 배포 실패

1. NPM 토큰이 올바르게 설정되었는지 확인
2. 패키지 이름이 이미 존재하지 않는지 확인
3. 버전이 이미 배포되었는지 확인

### GitHub Actions 권한 오류

1. Repository Settings에서 Actions 권한 확인
2. `GITHUB_TOKEN` 권한이 충분한지 확인

### 빌드 실패

1. 로컬에서 `npm run build` 실행 테스트
2. TypeScript 컴파일 오류 확인
3. 의존성 설치 상태 확인

## 버전 관리

이 프로젝트는 [Semantic Versioning](https://semver.org/)을 따릅니다:

- **MAJOR** (1.0.0): 호환되지 않는 API 변경
- **MINOR** (0.1.0): 하위 호환 기능 추가
- **PATCH** (0.0.1): 하위 호환 버그 수정


