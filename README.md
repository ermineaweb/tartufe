# tartufe


Jeu de société node / react / graphql.

- Le détective principal est le premier à jouer.
- Le détective et ses adjoints ont un mot identique.
- Un traitre (le tartufe) se cache parmi les adjoints, il n'a pas de mot.
- Chacun son tour, les adjoints indiquent un mot pour prouver qu'ils ne sont pas le tartufe.
- Le tartufe doit faire en sorte de passer inaperçu.
- Une fois que les adjoints ont donné assez de mots, un vote a lieu.
- Le tartufe peut influencer le vote en faisant semblant de voter.
- Les points sont attribués et un nouveau round commence avec un nouveau mot et un nouveau tartufe.


todo

- proposition de mots

- gerer une sauvegarde en localstorage

- une page pour voir les stats a partir de mongodb

- store global pour gérer les erreurs


```
git clone https://github.com/ermineaweb/tartufe

cd tartufe/docker

docker-compose up --build
```
