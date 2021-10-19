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
    '$2b$10$Su1GrUT/gMCRESZBXjtrgOxmYA.oQCyj.8oBNW48VkgIB9HT1kIDm',
    /* password */
    'user'
  ),
  (
    'user_2',
    '2@2.2',
    '$2b$10$Su1GrUT/gMCRESZBXjtrgOxmYA.oQCyj.8oBNW48VkgIB9HT1kIDm',
    /* 2 */
    'user'
  ),
  (
    'user_3',
    '3@3.3',
    '$2b$10$Su1GrUT/gMCRESZBXjtrgOxmYA.oQCyj.8oBNW48VkgIB9HT1kIDm',
    'user'
  ),
  (
    'user_4',
    '4@4.4',
    '$2b$10$Su1GrUT/gMCRESZBXjtrgOxmYA.oQCyj.8oBNW48VkgIB9HT1kIDm',
    'user'
  ),
  (
    'user_5',
    '5@5.5',
    '$2b$10$Su1GrUT/gMCRESZBXjtrgOxmYA.oQCyj.8oBNW48VkgIB9HT1kIDm',
    'user'
  ),
  (
    'user_6',
    '6@6.6',
    '$2b$10$Su1GrUT/gMCRESZBXjtrgOxmYA.oQCyj.8oBNW48VkgIB9HT1kIDm',
    'user'
  ),
  (
    'user_7',
    '7@7.7',
    '$2b$10$Su1GrUT/gMCRESZBXjtrgOxmYA.oQCyj.8oBNW48VkgIB9HT1kIDm',
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
    'Csehország fővárosa és egyben legnagyobb városa, az Európai Unió 13.legnagyobb városa.',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit.Necessitatibus exercitationem quae ullam harum,
quo omnis inventore soluta repudiandae tempore architecto,
aspernatur obcaecati a excepturi explicabo magni cum,
quisquam debitis itaque unde laboriosam ! Ab magnam vitae ea unde,
voluptates deserunt architecto quam hic non ? Optio inventor',
    'praga.jpg'
  ),
  (
    'Budapest',
    'Magyarország',
    'Budapest Magyarország fővárosa,
egyben legnagyobb és legnépesebb városa,
az Európai Unió legnépesebb városai közé tartozik.',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit.Necessitatibus exercitationem quae ullam harum,
quo omnis inventore soluta repudiandae tempore architecto,
aspernatur obcaecati a excepturi explicabo magni cum,
quisquam debitis itaque unde laboriosam ! Ab magnam vitae ea unde,
voluptates deserunt architecto quam hic non ? Optio inventore qui,
illo sequi maiores,
aliquam voluptas quisquam ad quod',
    'budapest.jpg'
  ),
  (
    'Madrid',
    'Spanyolország',
    'Madrid Spanyolország fővárosa és az azonos nevű tartom ányszékhelye. Területe: 607 km². Lakóinak száma 2011-ben 3,26 millió',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit.Necessitatibus exercitationem quae ullam harum,
quo omnis inventore soluta repudiandae tempore architecto,
aspernatur obcaecati a excepturi explicabo magni cum,
quisquam debitis itaque unde laboriosam ! Ab magnam vitae ea unde,
voluptates deserunt architecto quam hic non ? Optio inventore qui,
illo sequi maiores,
aliquam voluptas quisquam ad quod,
tenetur suscipit',
    'madrid.jpg'
  ),(
    'Berlin',
    'Németország',
    'Berlin Németország fővárosa, egyben tartományi rangú városállama (szövetségi tartománya) és a Berlin/Brandenburg nagyvárosi régió centruma.',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit.Necessitatibus exercitationem quae ullam harum,
quo omnis inventore soluta repudiandae tempore architecto,
aspernatur obcaecati a excepturi explicabo magni cum,
quisquam debitis itaque unde laboriosam ! Ab magnam vitae ea unde,
voluptates deserunt architecto quam hic non ? Optio inventore qui,
illo sequi maiores,
aliquam voluptas quisquam ad quod.',
    'berlin.jpg'
  ),
  (
    'Lisszabon',
    'Portugália',
    'Lisszabon (portugálul Lisboa) Portugália fővárosa és egyben legnagyobb városa.',
    'aliquam voluptas quisquam ad quod,
tenetur suscipit reiciendis natus rerum odio libero.Saepe voluptas,
nesciunt fugiat quae totam tempora,
ducimus exercitationem beatae hic quidem,
officiis unde nobis ullam magnam dolores facilis ? Iste in earum aliquam voluptatum voluptate facilis culpa quibusdam dicta nemo quo inventore exercitationem eum,
impedit fugit beatae consequuntur obcaecati eligendi architecto dolorum vel cupiditate quam neque quae ! Ratione sunt,
veritatis cumque suscipit cum tenetur ? Consectetur unde accusantium earum et repellendus beatae dignissimos sint,
doloremque officiis esse culpa laboriosam ! Ducimus ex incidunt voluptatem totam unde quidem recusandae iusto temporibus qui,
ab tempore vero maxime ad sequi',
    'lisboa.png'
  ),
  (
    'Pécs',
    'Magyarország',
    'Pécs  megyei jogú város Magyarország délnyugati részén,
az ország ötödik legnagyobb települése. A Dunántúlon pedig a legnagyobb település.',
    'libero.Saepe voluptas,
nesciunt fugiat quae totam tempora,
ducimus exercitationem beatae hic quidem,
officiis unde nobis ullam magnam dolores facilis ? Iste in earum aliquam voluptatum voluptate facilis culpa quibusdam dicta nemo quo inventore exercitationem eum,
impedit fugit beatae consequuntur obcaecati eligendi architecto dolorum vel cupiditate quam neque quae ! Ratione sunt,
veritatis cumque suscipit cum tenetur.',
    'pecs.jpg'
  )