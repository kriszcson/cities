CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
Create Table users(
  user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL UNIQUE,
  user_password TEXT NOT NULL,
  user_role TEXT NOT NULL
);
INSERT INTO
  users(user_name, user_email, user_password, user_role)
VALUES
  (
    'admin',
    'admin@admin.com',
    '$2b$10$0KK4U1qwh62fUF9gVR4ODOu49ogb5Axr0btXExazh86M3EtJfvM.6',
    /* admin */
    'admin'
  ),
  (
    'user_1',
    '1@1.1',
    '$2b$10$ngw/s3qOV/3lZAlIoZ.gF.986TsV96weM53BSRhgoYW6fUJFecJ6.',
    /* 1 */
    'user'
  );
Create Table cities(
    city_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    city_name TEXT NOT NULL,
    city_country TEXT NOT NULL,
    city_short_desc TEXT NOT NULL,
    city_long_desc TEXT NOT NULL,
    city_img_url TEXT NOT NULL
  );
INSERT INTO
  cities(
    city_name,
    city_country,
    city_short_desc,
    city_long_desc,
    city_img_url
  )
VALUES(
    'Prága',
    'Csehország',
    'Csehország fővárosa és egyben legnagyobb városa, az Európai Unió 13.legnagyobb városa. A Moldva partján fekvő Prága mintegy 1,3 millió embernek ad otthont.',
    '<li>Lorem ipsum dolor sit amet consectetur adipisicing elit.
<li>quo omnis inventore soluta repudiandae tempore architecto,
<li>aspernatur obcaecati a excepturi explicabo magni cum,
<li>quisquam debitis itaque unde laboriosam ! Ab magnam vitae ea unde,
<li>voluptates deserunt architecto quam hic non ? Optio inventore qui,
<li>aliquam voluptas quisquam ad quod',
    'praga.jpg'
  ),
  (
    'Budapest',
    'Magyarország',
    'Budapest [6] Magyarország fővárosa,
egyben legnagyobb és legnépesebb városa,
az Európai Unió legnépesebb városai közé tartozik.Budapest az ország politikai,
kulturális,
kereskedelmi,
ipari ésközlekedési központja. Emellett Pest megye székhelye is',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit.Necessitatibus exercitationem quae ullam harum,
quo omnis inventore soluta repudiandae tempore architecto,
aspernatur obcaecati a excepturi explicabo magni cum,
quisquam debitis itaque unde laboriosam ! Ab magnam vitae ea unde,
voluptates deserunt architecto quam hic non ? Optio inventore qui,
illo sequi maiores,
aliquam voluptas quisquam ad quod,
tenetur suscipit reiciendis natus rerum odio libero.Saepe voluptas,
nesciunt fugiat quae totam tempora,
ducimus exercitationem beatae hic quidem,
officiis unde nobis ullam magnam dolores facilis ? Iste in earum aliquam voluptatum voluptate facilis culpa quibusdam dicta nemo quo inventore exercitationem eum,
impedit fugit beatae consequuntur obcaecati eligendi architecto dolorum vel cupiditate quam neque quae ! Ratione sunt,
veritatis cumque suscipit cum tenetur ? Consectetur unde accusantium earum et repellendus beatae dignissimos sint,
doloremque officiis esse culpa laboriosam ! Ducimus ex incidunt voluptatem totam unde quidem recusandae iusto temporibus qui,
ab tempore vero maxime ad sequi,
dolor voluptatum ! Accusantium beatae vel obcaecati veritatis blanditiis earum tenetur sapiente fugiat nostrum,
quasi vitae quo et iure ea reprehenderit incidunt quos officia.Nostrum quam dolorem delectus harum voluptatibus magni,
incidunt,
velit quas laboriosam omnis ex atque alias laborum quibusdam debitis molestias deserunt aut rem,
assumenda quidem amet quo.Esse rem quo voluptates ! Aperiam.',
    'budapest.jpg'
  ),
  (
    'Madrid',
    'Spanyolország',
    'Madrid Spanyolország fővárosa és az azonos nevű tartom ányszékhelye. Területe: 607 km². Lakóinak száma 2011-ben 3,26 millió, elővárosokkal együtt kb.6,5 millió fő. Berlin után a második legnépesebb város az Európai Unió területén. Területének több mint 50%-át utcák,
terek és parkok alkotják.',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit.Necessitatibus exercitationem quae ullam harum,
quo omnis inventore soluta repudiandae tempore architecto,
aspernatur obcaecati a excepturi explicabo magni cum,
quisquam debitis itaque unde laboriosam ! Ab magnam vitae ea unde,
voluptates deserunt architecto quam hic non ? Optio inventore qui,
illo sequi maiores,
aliquam voluptas quisquam ad quod,
tenetur suscipit reiciendis natus rerum odio libero.Saepe voluptas,
nesciunt fugiat quae totam tempora,
ducimus exercitationem beatae hic quidem,
officiis unde nobis ullam magnam dolores facilis ? Iste in earum aliquam voluptatum voluptate facilis culpa quibusdam dicta nemo quo inventore exercitationem eum,
impedit fugit beatae consequuntur obcaecati eligendi architecto dolorum vel cupiditate quam neque quae ! Ratione sunt,
veritatis cumque suscipit cum tenetur ? Consectetur unde accusantium earum et repellendus beatae dignissimos sint,
doloremque officiis esse culpa laboriosam ! Ducimus ex incidunt voluptatem totam unde quidem recusandae iusto temporibus qui,
ab tempore vero maxime ad sequi,
dolor voluptatum ! Accusantium beatae vel obcaecati veritatis blanditiis earum tenetur sapiente fugiat nostrum,
quasi vitae quo et iure ea reprehenderit incidunt quos officia.Nostrum quam dolorem delectus harum voluptatibus magni,
incidunt,
velit quas laboriosam omnis ex atque alias laborum quibusdam debitis molestias deserunt aut rem,
assumenda quidem amet quo.Esse rem quo voluptates ! Aperiam.',
    'madrid.jpg'
  ),(
    'Berlin',
    'Németország',
    'Berlin Németország fővárosa, egyben tartományi rangú városállama (szövetségi tartománya) és a Berlin/Brandenburg nagyvárosi régió centruma. 6 millió lakosával Németország legnépesebb és kiterjedésében is legnagyobb városa, egyben az Eur ó pai Unió legnépesebb és legnagyobb városa.',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit.Necessitatibus exercitationem quae ullam harum,
quo omnis inventore soluta repudiandae tempore architecto,
aspernatur obcaecati a excepturi explicabo magni cum,
quisquam debitis itaque unde laboriosam ! Ab magnam vitae ea unde,
voluptates deserunt architecto quam hic non ? Optio inventore qui,
illo sequi maiores,
aliquam voluptas quisquam ad quod,
tenetur suscipit reiciendis natus rerum odio libero.Saepe voluptas,
nesciunt fugiat quae totam tempora,
ducimus exercitationem beatae hic quidem,
officiis unde nobis ullam magnam dolores facilis ? Iste in earum aliquam voluptatum voluptate facilis culpa quibusdam dicta nemo quo inventore exercitationem eum,
impedit fugit beatae consequuntur obcaecati eligendi architecto dolorum vel cupiditate quam neque quae ! Ratione sunt,
veritatis cumque suscipit cum tenetur ? Consectetur unde accusantium earum et repellendus beatae dignissimos sint,
doloremque officiis esse culpa laboriosam ! Ducimus ex incidunt voluptatem totam unde quidem recusandae iusto temporibus qui,
ab tempore vero maxime ad sequi,
dolor voluptatum ! Accusantium beatae vel obcaecati veritatis blanditiis earum tenetur sapiente fugiat nostrum,
quasi vitae quo et iure ea reprehenderit incidunt quos officia.Nostrum quam dolorem delectus harum voluptatibus magni,
incidunt,
velit quas laboriosam omnis ex atque alias laborum quibusdam debitis molestias deserunt aut rem,
assumenda quidem amet quo.Esse rem quo voluptates ! Aperiam.',
    'berlin.jpg'
  ),
  (
    'Lisszabon',
    'Portugália',
    'Lisszabon (portugálul Lisboa) Portugália fővárosa és egyben legnagyobb városa. Megyeszékhelye Lisszabon megyének, székhelye a Lisszaboni régiónak és központja Nagy-Lisszabon szubrégiónak.Itt található a Lisszaboni patriarkátus székhelye is.',
    'aliquam voluptas quisquam ad quod,
tenetur suscipit reiciendis natus rerum odio libero.Saepe voluptas,
nesciunt fugiat quae totam tempora,
ducimus exercitationem beatae hic quidem,
officiis unde nobis ullam magnam dolores facilis ? Iste in earum aliquam voluptatum voluptate facilis culpa quibusdam dicta nemo quo inventore exercitationem eum,
impedit fugit beatae consequuntur obcaecati eligendi architecto dolorum vel cupiditate quam neque quae ! Ratione sunt,
veritatis cumque suscipit cum tenetur ? Consectetur unde accusantium earum et repellendus beatae dignissimos sint,
doloremque officiis esse culpa laboriosam ! Ducimus ex incidunt voluptatem totam unde quidem recusandae iusto temporibus qui,
ab tempore vero maxime ad sequi,
dolor voluptatum ! Accusantium beatae vel obcaecati veritatis blanditiis earum tenetur sapiente fugiat nostrum,
quasi vitae quo et iure ea reprehenderit incidunt quos officia.Nostrum quam dolorem delectus harum voluptatibus magni,
incidunt,
velit quas laboriosam omnis ex atque alias laborum quibusdam debitis molestias deserunt aut rem,
assumenda quidem amet quo.Esse rem quo voluptates ! Aperiam.',
    'lisboa.png'
  ),
  (
    'Pécs',
    'Magyarország',
    'Pécs  megyei jogú város Magyarország délnyugati részén,
az ország ötödik legnagyobb települése. A Dunántúlon pedig a legnagyobb település. Baranya megye és a Pécsi járás székhelye,
a Dél - Dunántúl központja.',
    'libero.Saepe voluptas,
nesciunt fugiat quae totam tempora,
ducimus exercitationem beatae hic quidem,
officiis unde nobis ullam magnam dolores facilis ? Iste in earum aliquam voluptatum voluptate facilis culpa quibusdam dicta nemo quo inventore exercitationem eum,
impedit fugit beatae consequuntur obcaecati eligendi architecto dolorum vel cupiditate quam neque quae ! Ratione sunt,
veritatis cumque suscipit cum tenetur ? Consectetur unde accusantium earum et repellendus beatae dignissimos sint,
doloremque officiis esse culpa laboriosam ! Ducimus ex incidunt voluptatem totam unde quidem recusandae iusto temporibus qui,
ab tempore vero maxime ad sequi,
dolor voluptatum ! Accusantium beatae vel obcaecati veritatis blanditiis earum tenetur sapiente fugiat nostrum,
quasi vitae quo et iure ea reprehenderit incidunt quos officia.Nostrum quam dolorem delectus harum voluptatibus magni,
incidunt,
velit quas laboriosam omnis ex atque alias laborum quibusdam debitis molestias deserunt aut rem,
assumenda quidem amet quo.Esse rem quo voluptates ! Aperiam.',
    'pecs.jpg'
  )