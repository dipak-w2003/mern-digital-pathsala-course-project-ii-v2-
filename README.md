# MICROSERVICE ARCHITECTURE

## clients/nextJS (_TS_)

Dividing client side with different website in order to achieve same thing with better overal project handling

1.  [PORT/SERVICE 1: client-institute/](./client/client-institute/) : Level 1

- More CSR & Tailwind Flex etc used

<br/>
 
2.  [PORT/SERVICE 2: client-teacher/](./client/client-teacher/) : Level 2

- More SSR & ShadCN etc used
- **<u>Features</u>**:
- - Authentication (Login)
- - Course -> Chapters
- - Student Informations

<br/>

- **<u>Technologies</u>**:
- - UI -> ShadCN
- - SSR -> fetch, formik
- - Middlwares -> Next Middleware
- - Extras: Validation(`JOI`)

<br/>

3.  [PORT/SERVICE 3: client-student/](./client/client-student/) : Level 3

- Optimization, Refactoring and Caching More
- **<u>Features</u>**:
- - Payment Integration
- - Reviews, Ratings

<br/>

- **<u>Technologies</u>**:
- - Testings
- - Performance (_useCallback_, _useMemo_)

<br/>

4. LAST : [Deployments]()

- **<u>Options</u>**:
- - [AWS]()
- - [Cpanel]()
- - [Free VPS]()

<br/>
<br/>

## server/nodeJS (ts,sequelize/mysql)

For now backend will be normal or single not divided now for microservice architecture

1. [PORT/SERVICE 1: server/](./server/)
