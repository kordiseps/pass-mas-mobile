export const PaswordsTableInitialize = `
CREATE TABLE IF NOT EXISTS Paswords (
    id INTEGER PRIMARY KEY NOT NULL ,
    app TEXT NOT NULL ,
    username TEXT NOT NULL ,
    password TEXT NOT NULL ,
    color TEXT NOT NULL,
    apiId TEXT NULL,
    state INTEGER NOT NULL );
`;

export const ColorsTableInitialize = `
CREATE TABLE IF NOT EXISTS Colors (
    id INTEGER PRIMARY KEY NOT NULL ,
    location TEXT NOT NULL ,
    locationDescription TEXT NOT NULL ,
    value TEXT NOT NULL );
`;

export const SettingsTableInitialize = `
CREATE TABLE IF NOT EXISTS Settings (
    id INTEGER PRIMARY KEY NOT NULL ,
    setting TEXT NOT NULL ,
    value TEXT NOT NULL );    
`;

export const GetTables = `
SELECT * FROM sqlite_master WHERE type='table';
`;


//Paswords state:
//0 eklendi, senkronizasyon bekliyor
//1 değiştirildi, senkronizasyon bekliyor
//2 silindi, senkronizasyon bekliyor
//3 senkronizasyon yapıldı

// export const GetColor = (location) => `
// SELECT value FROM Colors WHERE location = '${location}' ORDER BY ROWID ASC LIMIT 1;
// `;

export const GetColors = `
SELECT * FROM Colors 
`;
export const SetColor =(location,color)=> `
UPDATE Colors SET value ='${color}' WHERE location = '${location}' 
`;

export const GetPasswords = `
SELECT * FROM Paswords;
`;

export const InsertPassword = (app, userName, password, color) => `
INSERT INTO Paswords ( app, userName, password, color, state ) 
VALUES ('${app}','${userName}','${password}','${color}', 0);
`;

export const InsertApiIdPassword = (id, apiId) => `
UPDATE Paswords SET apiId ='${apiId}', state = 3 WHERE id = ${id};
`;

export const InsertUser = (userMail, pinCode) => `
INSERT INTO Settings ( setting, value ) 
VALUES 
    ('userMail', '${userMail}'),
    ('pinCode', '${pinCode}');
`;

export const DeleteUsers = `
DELETE FROM Settings WHERE setting in ( 'userMail', 'pinCode');
`;

export const GetUserMail = `
SELECT * FROM Settings WHERE setting = 'userMail';
`;
export const GetUserPinCode = `
SELECT * FROM Settings WHERE setting = 'pinCode';
`;
export const UpdateUserPinCode = (pinCode)=> `
UPDATE Settings SET value = '${pinCode}' WHERE setting = 'pinCode';
`;

export const SuggestedColors = `
INSERT INTO Colors ( location, locationDescription, value ) 
VALUES 
    ('backColor', 'Uygulama Arkaplanı Rengi', '#ededed'),
    ('mainColor', 'Ana Renk', '#0C1618'),
    ('passiveColor', 'Pasif Renk', '#335b63'),
    ('cancelColor', 'İptal Rengi', '#333025');
`;

// export const SuggestedDarkModeColors = `
// INSERT INTO Colors ( location, locationDescription, value ) 
// VALUES 
//     ('backColor', 'Uygulama Arkaplanı Rengi', '#222222'),
//     ('mainColor', 'Ana Renk', '#c9999f'),
//     ('passiveColor', 'Pasif Renk', '#7d6366'),
//     ('cancelColor', 'İptal Rengi', '#4c2b36');
// `;

export const DeleteColors = `
DELETE FROM Colors;
`;
