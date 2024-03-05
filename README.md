# Home-Task-Tracker (HTT)

HTT, home task tracker is a gamified way of having all the housework done !
It's is currently in developement.

this project use the following stacks :
- SvelteKit as frontend : https://kit.svelte.dev/
- PocketBase as backend : https://pocketbase.io/

# Start Backend
```bash
docker compose up -d
```
- REST API: http://0.0.0.0:8080/api/
- Admin UI: http://0.0.0.0:8080/_/

# Start front end
```bash
cd sk
npm run start
```

# Grafana - query example

```sql
SELECT u.name, SUM(score), timestamp as ts 
FROM records as r
INNER JOIN users as u
ON u.id == r.user
GROUP BY user
ORDER BY ts ASC
```

# Contributors

- [Drazic MARTIN](https://github.com/drazicmartin)