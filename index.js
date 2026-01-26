const odbc = require('./lib/odbc');

const dsn = 'DSN=Dev_GateworksV2';

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

    console.log('---- Test 1 ----');
    const requestQuery = `
        select
            SPLIT_PART(cc.CdeNum, '-', 1),
            cc.CdeNum as Repere, 
            cc.Reference
        from commandesclients cc
        where cc.creele > '20230101' and SPLIT_PART(cc.CdeNum, '-', 1) != cc.CdeNum and SPLIT_PART(cc.CdeNum, '-', 2) = '1'
        and SPLIT_PART(
            cc.CdeNum, '-', 1) in (select SPLIT_PART(cc.CdeNum, '-', 1) from commandesclients cc 
            where cc.creele > '20230101' and SPLIT_PART(cc.CdeNum, '-', 1) = cc.CdeNum
        )
    `;
    const result = await pool.query(requestQuery);
    console.log(result);

    console.log('---- Test 2 ----');

    const requestQuery2 = `
        select * from utilisateurs limit 20
    `;
    const result2 = await pool.query(requestQuery2);
    console.log(result2);
};

run();
