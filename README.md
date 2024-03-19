# Home-Task-Tracker (HTT)

HTT, home task tracker is a gamified way of having all the housework done !
It's is currently in developement.

this project use the following stacks :
- SvelteKit as frontend : https://kit.svelte.dev/
- PocketBase as backend : https://pocketbase.io/

# Development 
## Start Backend
```bash
docker compose -f dev-docker-compose.yml up -d
```
- REST API: http://0.0.0.0:8080/api/
- Admin UI: http://0.0.0.0:8080/_/

## Start front end
```bash
cd sk
npm run start -- --open
```

# Deploy
Simply run
```
docker compose up -d
```

- I use a nginx server as a reverse proxy to be able to :
  - `localhost/htt` --> `sk` front end app
  - `localhost/pb` --> `pk` back end app
  - `localhost/grafana` --> grafana app

# Grafana - query example

```sql
SELECT u.name, SUM(score), strftime('%s', r.created)*1000 as ts
FROM records as r
INNER JOIN users as u ON u.id = r.user
WHERE ts >= $__from AND ts <= $__to
GROUP BY u.name, ts
ORDER BY ts DESC;
```

# Contributors

- [Drazic MARTIN](https://github.com/drazicmartin)