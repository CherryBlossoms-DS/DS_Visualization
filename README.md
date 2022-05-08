# DS_Visualization 

### Issues(Document)

- 이슈 제목은 **한글, 영어** 상관없습니다!
- 프로젝트와 관련된 모든 문서는 마크다운 형식에 맞게 이슈탭에 작성합니다.
- 문서를 작성할때는 이슈 템플릿에 맞게 작성하고 Assignees(담당자)는 작성자(본인)을 선택합니다.
- 필요에 따라 Wiki에 이슈 문서를 참조하는 형태로 정리하고, 논의가 종료된 이슈는 close합니다.
- 이슈는 필요에 맞게 자유롭게 많이 많이 작성할수록 좋습니다.

<details>
<summary>왜 모든 문서를 이슈탭에 작성하나요?</summary>
이슈는 작성자, 라벨, 템플릿 등의 메타데이터를 통해 히스토리를 파악하기 쉽고, 코멘트와 이모지 기능이 있어서 Wiki보다 커뮤니케이션 하기가 편리한 장점이 있습니다.
</details>


### Branch

- 브랜치는 배포용 브랜치인 master 브랜치와 개발용 브랜치인 develop(default)브랜치를 메인 브랜치로 사용합니다.
- 브랜치는 이슈사항을 먼저 이슈탭에 작성한뒤에 생성합니다.
- 브랜치 생성규칙은 `{prefix}/#{issue_number}`와 같은 형태로 작성합니다. ex) `feat/#30`
- 개발중에 발생한 이슈는 develop브랜치에서 생성하고 운영중에 발생한 이슈는 master브랜치에서 생성합니다.

ref.
[Git 브랜칭 전략 : Git-flow와 Github-flow](https://hellowoori.tistory.com/56)

### Commit

- 커밋 메시지의 subject는 **영어**로 작성합니다.
- 커밋 메시지는 `{prefix}: {action} {subject} (#{issue_number})` 형태로 작성합니다. `feat: Add list component (#30)`
- `action`의 첫 글자는 대문자
- 부연 설명이 필요한 경우 body에 작성합니다.(한글가능)

ref.
[Git - 커밋 메시지 컨벤션](https://doublesprogramming.tistory.com/256)
[[Git] 깃 커밋 메시지 컨벤션 (Git Commit Message Convention)](https://da-nyee.github.io/posts/git-git-commit-message-convention/)

### Pull Request

- 풀리퀘스트는 정해진 템플릿에 맞춰 작성하고 제목은 **영어**로 작성합니다. `[{prefix}] {content}`
- UI와 관련된 사항은 가급적 GIF를 첨부합니다.
- 코드리뷰를 반영하고 한개 이상의 approve를 받은 후에 본인이 merge합니다.
- 간단한 변경사항은 `self-approve` 라벨을 붙이고 스스로 merge 할 수 있습니다.

### Prefix

- feature
  - 새로운 기능을 추가할 때
  - 약어인 `feat`을 사용
- fix
  - 버그를 수정할때
- hotfix
  - 운영중에 생긴버그를 급하게 수정해야할 때
- docs
  - 문서와 관련된 작업 ex) REDAME 파일
- refactor
  - 코드를 리팩토링할때
- build
  - 빌드와 관련된 작업
- markup
  - HTML,CSS 등 마크업과 관련된 작업
- setting
  - 프로젝트 초기 설정 및 환경설정 파일 등
- style
  - 코드 컨벤션, 코드 포맷팅 등 코드 스타일에 관련된 작업
  - 주의! UI desgin을 말하는게 아님
- test
  - 테스트 코드와 관련된 작업
- chore
  - 그외 자잘한 작업 ex)오타 수정, 자잘한 실수


### Contribute Process

1. 이슈 작성
2. 브랜치 생성
3. 코드 작성
4. 커밋
5. (3),(4)를 반복하고 완료되면 Push
6. Pull Request 작성
7. 코드리뷰 요청(일정 시간동안 approve가 없는경우)
8. 코드리뷰 반영
9. Merge
10. `Delete Branch`를 클릭하여 브랜치 삭제
