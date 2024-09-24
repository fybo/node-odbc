const odbc = require('./lib/odbc');

const dsn = 'DSN=Dev_Gateworks';

const run = async () => {
    const pool = await odbc.pool({
        connectionString: dsn,
        connectionTimeout: 60 * 1000,
        loginTimeout: 10 * 1000,
        initialSize: 4,
        incrementSize: 1,
        maxSize: 16,
        shrink: false,
    });

    await pool.connect();

    console.log("---- Test 1 ----")
    const requestQuery = `
    SELECT
        DateSortie, Code_article, Quantite, Motif, cast(Observations as VARCHAR(100)) as Observations, CdeNum, Client, CodeColoris, CodeArtCodeColoris, numSortie,
        cast(PrixSortiePMP as DOUBLE PRECISION) as PrixSortiePMP, cast(PrixSortiePxAchat as DOUBLE PRECISION) as PrixSortiePxAchat, CrééPar, Crééle
    FROM
        sortiestock
    LIMIT 5
`
    const result = await pool.query(requestQuery);
    console.log(result)

    /*console.log('---- Test 2 ----');

    const requestQuery2 = `
        select * from utilisateurs limit 3
    `;
    const result2 = await pool.query(requestQuery2);
    console.log(result2);*/
};

run();