const {createServer} = require('http'); function checkMethod(_0x4ef7e1) { const _0x5a9e45 = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']; if (!_0x5a9e45['includes'](_0x4ef7e1)) throw new Error('invalid\x20method'); } function checkPath(_0x2c2d3d) { if (typeof _0x2c2d3d === 'string') { if (!_0x2c2d3d['startsWith']('/')) throw new Error('path\x20must\x20start\x20with\x20/'); return; } if (_0x2c2d3d instanceof RegExp) { if (!_0x2c2d3d['source']['startsWith']('^\x5c/') || !_0x2c2d3d['source']['endsWith']('$')) throw new Error('path\x20must\x20start\x20with\x20^/\x20and\x20ends\x20with\x20$'); return; } throw new Error('path\x20must\x20be\x20string\x20or\x20RegExp'); } class RegexRouter { constructor() { this['routes'] = new Map(), this['middlewares'] = [], this['notFoundHandler'] = (_0x17397e, _0x151ead) => { _0x151ead['statusCode'] = 0x194, _0x151ead['end'](JSON['stringify']({'error': 'Not\x20found'})); }, this['internalErrorHandler'] = (_0x45e0d7, _0x24ab08) => { _0x24ab08['statusCode'] = 0x1f4, _0x24ab08['end'](JSON['stringify']({'error': e['message']})); }; } ['use'](_0xd3808d) { this['middlewares']['push'](_0xd3808d), this['notFoundHandler'] = _0xd3808d(this['notFoundHandler']), this['internalErrorHandler'] = _0xd3808d(this['internalErrorHandler']); } ['register'](_0x151e27, _0x1ebb44, _0xd6cfdb, ..._0x5c98c2) { checkMethod(_0x151e27), checkPath(_0x1ebb44), _0xd6cfdb = _0x5c98c2['reduce']((_0x481268, _0x25b522) => _0x25b522(_0x481268), _0xd6cfdb), _0xd6cfdb = this['middlewares']['reduce']((_0x4d0652, _0x545acd) => _0x545acd(_0x4d0652), _0xd6cfdb); if (this['routes']['has'](_0x151e27)) { this['routes']['get'](_0x151e27)['set'](_0x1ebb44, _0xd6cfdb); return; } this['routes']['set'](_0x151e27, new Map([[_0x1ebb44, _0xd6cfdb]])); } ['handle'](_0x4f502b, _0x415dce) { if (!this['routes']['has'](_0x4f502b['method'])) { this['notFoundHandler'](_0x4f502b, _0x415dce); return; } const _0x5173a9 = [...this['routes']['get'](_0x4f502b['method'])['entries']()]['find'](([_0xaa84ba, _0x2c2a61]) => { if (typeof _0xaa84ba === 'string') return _0xaa84ba === _0x4f502b['url']; return _0xaa84ba['test'](_0x4f502b['url']); }); if (typeof _0x5173a9 === 'undefined') { this['notFoundHandler'](_0x4f502b, _0x415dce); return; } const [_0x3aea3f, _0x865581] = _0x5173a9; try { _0x3aea3f instanceof RegExp && (_0x4f502b['matches'] = _0x3aea3f['exec'](_0x4f502b['url'])['groups']), _0x865581(_0x4f502b, _0x415dce); } catch (_0x32de25) { this['internalErrorHandler'](_0x4f502b, _0x415dce); } } } const cors = _0x4545a7 => (_0x406a64, _0x4ecc21) => { const _0x308d8c = _0x406a64['headers']['origin']; if (!_0x308d8c) { _0x4545a7(_0x406a64, _0x4ecc21); return; } const _0x501850 = {'access-control-allow-origin': '*'}; if (_0x406a64['method'] !== 'OPTIONS') { Object['entries'](_0x501850)['forEach'](([_0x3f4c76, _0x278e06]) => _0x4ecc21['setHeader'](_0x3f4c76, _0x278e06)); try { _0x4545a7(_0x406a64, _0x4ecc21); return; } catch (_0x357545) { _0x357545['headers'] = {..._0x357545['headers'], ..._0x501850}; throw _0x357545; } } _0x406a64['headers']['access-control-request-method'] && (Object['entries']({ ..._0x501850, 'access-control-allow-methods': 'GET,\x20POST,\x20PUT,\x20DELETE,\x20PATCH' })['forEach'](([_0x2279d9, _0x38445d]) => _0x4ecc21['setHeader'](_0x2279d9, _0x38445d)), _0x406a64['headers']['access-control-request-headers'] && _0x4ecc21['setHeader']('access-control-allow-headers', _0x406a64['headers']['access-control-request-headers']), _0x4ecc21['statusCode'] = 0xcc, _0x4ecc21['end']()); }, slow = _0x47a5be => (_0x456cb3, _0x54e396) => { setTimeout(() => { _0x47a5be(_0x456cb3, _0x54e396); }, 0x1388); }, error = _0x15cfbd => (_0x8546d0, _0x445eb8) => { if (Math['random']() > 0.7) { _0x445eb8['statusCode'] = 0x1f4, _0x445eb8['end'](); return; } _0x15cfbd(_0x8546d0, _0x445eb8); }, log = _0x399189 => (_0x20c09f, _0x449dc9) => { console['info']('incoming\x20request:\x20' + _0x20c09f['method'] + '\x20' + _0x20c09f['url']), _0x399189(_0x20c09f, _0x449dc9); }, json = _0x161ff2 => (_0x268960, _0x350197) => { const _0xe1ee42 = []; _0x268960['on']('data', _0x29e8b8 => { _0xe1ee42['push'](_0x29e8b8); }), _0x268960['on']('end', () => { try { _0x268960['body'] = JSON['parse'](Buffer['concat'](_0xe1ee42)['toString']()); } catch (_0x28ad6b) { _0x350197['statusCode'] = 0x1f4, _0x350197['end'](JSON['stringify']({'error': 'invalid\x20json'})); return; } console['info'](_0x268960['body']), _0x161ff2(_0x268960, _0x350197); }); }, multipart = _0x5bd61f => (_0x4f2788, _0x59e087) => { const _0x48ab63 = [], _0x398201 = '\x0d\x0a', _0x300f90 = _0x398201['repeat'](0x2), _0x2856cb = _0x2bdb42 => { const _0x1dfc86 = {'name': null, 'type': null, 'filename': null, 'content': null}, _0x238ab3 = _0x2bdb42['indexOf'](_0x300f90); if (_0x238ab3 === -0x1) throw new Error('bad\x20multipart:\x20no\x20content\x20in\x20part'); const _0x3fbbb2 = _0x2bdb42['indexOf'](_0x398201, _0x238ab3 + _0x300f90['length']); if (_0x3fbbb2 === -0x1) throw new Error('bad\x20multipart:\x20no\x20content\x20in\x20part'); _0x1dfc86['content'] = _0x2bdb42['slice'](_0x238ab3 + _0x300f90['length'], _0x3fbbb2); let _0x54d104 = 0x0; do { const _0x275072 = _0x2bdb42['indexOf'](_0x398201, _0x54d104), _0x400156 = _0x2bdb42['slice'](_0x54d104, _0x275072)['toString'](); _0x400156['toLowerCase']()['startsWith']('content-disposition') && (_0x1dfc86['name'] = /name="(?<name>[^"]*)"/['exec'](_0x400156)['groups']['name'], _0x1dfc86['filename'] = /filename="(?<filename>[^"]*)"/['exec'](_0x400156)?.['groups']?.['filename']); if (_0x400156['toLowerCase']()['startsWith']('content-type')) { _0x1dfc86['type'] = _0x400156['split'](':')?.[0x1]?.['trim']() ?? 'unknown'; switch (_0x1dfc86['type']) { case'text/plain': _0x1dfc86['content'] = _0x1dfc86['content']['toString'](); break; case _0x1dfc86['type'] === 'application/json': _0x1dfc86['content'] = JSON['parse'](_0x1dfc86['content']['toString']()); break; } } _0x54d104 = _0x275072 + _0x398201['length']; } while (_0x54d104 < _0x238ab3); return _0x1dfc86; }; _0x4f2788['on']('data', _0x5b8b1f => { _0x48ab63['push'](_0x5b8b1f); }), _0x4f2788['on']('end', () => { try { const _0xc469d1 = _0x4f2788['headers']['content-type'], _0x3fe4aa = Buffer['concat'](_0x48ab63), [, _0x217eab] = _0xc469d1['split'](';')['map'](_0x2a6f59 => _0x2a6f59['trim']())['map'](_0x392d71 => _0x392d71['replace']('boundary=', '')), _0x2fab0b = '--' + _0x217eab + '\x0d\x0a', _0x4a0587 = _0x3fe4aa['indexOf'](_0x2fab0b); if (-0x1 === _0x4a0587) throw new Error('invalid\x20multipart'); const _0x2a1228 = '--' + _0x217eab + '--\x0d\x0a', _0x73e92f = _0x3fe4aa['indexOf'](_0x2a1228); if (-0x1 === _0x73e92f || _0x4a0587 > _0x73e92f) throw new Error('invalid\x20multipart'); _0x4f2788['body'] = {}; let _0x5150e4 = _0x4a0587; do { const _0x3952de = _0x3fe4aa['indexOf'](_0x2fab0b, _0x5150e4 + _0x2fab0b['length']); if (_0x3952de === -0x1) { const _0x3e1833 = _0x3fe4aa['slice'](_0x5150e4, _0x73e92f), _0x4720ec = _0x2856cb(_0x3e1833); _0x4f2788['body'][_0x4720ec['name']] = _0x4720ec, _0x5150e4 = _0x73e92f; break; } const _0x4e0c53 = _0x3fe4aa['slice'](_0x5150e4, _0x3952de), _0x1482f0 = _0x2856cb(_0x4e0c53); _0x4f2788['body'][_0x1482f0['name']] = _0x1482f0, _0x5150e4 = _0x3952de; } while (_0x5150e4 < _0x73e92f); } catch (_0x4a45c1) { _0x59e087['statusCode'] = 0x190, _0x59e087['end'](); return; } _0x5bd61f(_0x4f2788, _0x59e087); }); }, translateType = _0x3fdd22 => _0x3fdd22['startsWith']('audio/') ? 'audio' : _0x3fdd22['startsWith']('video/') ? 'video' : _0x3fdd22['startsWith']('image/') ? 'image' : 'unknown', calculateFinish = _0x1c5fc8 => { const _0x392411 = new Date(Date['now']() + 0x3 * 0x1e * 0x18 * 0xe10 * 0x3e8); return new Intl['DateTimeFormat']('default')['format'](_0x392411); }, createRouter = () => {
    const router = new RegexRouter();
    router.use(log);
    router.use(cors);

    const bonuses = {
      participating: true,
      balance: 200,
    };
    const accounts = [
      {
        id: 1001,
        title: 'Расчётный счёт',
        number: 'XXXXXXXXXXXXXXXXXXX',
        balance: 99999.99
      },
      {
        id: 1002,
        title: 'Текущий счёт',
        number: 'XXXXXXXXXXXXXXXXXXX',
        balance: 99999.99,
        cards: [
          {
            id: 2001,
            title: 'VISA Rewards Noname',
            type: 'VISA',
            number: '4779 86** **** 9999'
          },
          {
            id: 2002,
            title: 'VISA #MOZHNOVSE Digital',
            type: 'VISA',
            number: '4779 86** **** 9999'
          },
        ],
      },
    ];
    const availableDeposits = [
      {
        id: 1,
        title: '"150 лет надежности"',
        percent: 'До 5,25%',
      },
      {
        id: 2,
        title: '"Пополняемый"',
        percent: 'До 2,70%',
      },
      {
        id: 3,
        title: '"Управляемый"',
        percent: 'До 2,40%',
      },
    ];
    let nextDepositId = 5001;
    const deposits = [
      {
        id: nextDepositId++,
        title: '"150 лет надёжности"',
        finish: '10.11.2021',
        balance: 500000,
      },
    ];
    const credits = [];
    const history = [
      {
        id: 99,
        title: 'Открытие вклада "150 лет надёжности"',
        amount: 999999,
      },
      {
        id: 98,
        title: 'Перевод частному лицу в другой банк',
        amount: -1000,
      },
      {
        id: 97,
        title: 'Мегафон (Мобильная связь)',
        amount: -1000,
      }
    ];

    const cashback = {
      participating: false,
    };

    router.register('GET', '/api/health', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify([]));
    });

    router.register('GET', '/api/null', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(null));
    }, slow);

    router.register('GET', '/api/error', (req, res) => {
      res.statusCode = 500;
      res.end();
    }, slow);

    router.register('GET', '/api/bonuses', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      if (Math.random() > 0.5) {
        res.end(JSON.stringify(bonuses));
        return;
      }
      res.end(JSON.stringify({
        participating: false,
      }));
    }, error, slow);

    router.register('GET', '/api/accounts', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(accounts));
    }, error, slow);

    router.register('GET', '/api/deposits', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      if (Math.random() > 0.5) {
        res.end(JSON.stringify(deposits));
        return;
      }
      res.end(JSON.stringify([]));
    }, error, slow);

    router.register('POST', '/api/deposits', (req, res) => {
      const data = req.body;
      const fields = [
        {name: 'depositId', type: 'number'},
        {name: 'amount', type: 'number'},
        {name: 'period', type: 'number'},
      ];

      for (const field of fields) {
        if (!(field.name in data)) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({
            status: 'error',
            error: `no ${field.name} field`,
          }));
          return;
        }
        if (field.type !== typeof data[field.name]) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({
            status: 'error',
            error: `${field.name} must be ${field.type}`,
          }));
          return;
        }
      }

      if (![1, 2, 3].includes(data.depositId)) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
          status: 'error',
          error: 'invalid depositId - must be 1, 2 or 3',
        }));
        return;
      }

      if (data.amount <= 1000 ) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
          status: 'error',
          error: 'invalid amount - must be greater than 1000',
        }));
        return;
      }

      if (data.period <= 1 ) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
          status: 'error',
          error: 'invalid period - must be greater than 1',
        }));
        return;
      }

      deposits.push(
        {
          id: nextDepositId++,
          title: availableDeposits.find(o => o.id === data.depositId)?.title,
          finish: calculateFinish(data.period),
          balance: data.amount,
        },
      );

      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({status: 'ok'}));
    }, error, slow, json);

    router.register('GET', '/api/credits', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(credits));
    }, error, slow);

    router.register('GET', '/api/history', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      if (Math.random() > 0.5) {
        res.end(JSON.stringify(history));
        return;
      }
      res.end(JSON.stringify([]));
    }, error, slow);

    router.register('GET', '/api/cashback', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(cashback));
    }, error, slow);

    router.register('POST', '/api/cashback', (req, res) => {
      if (cashback.participating) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
          status: 'error',
          error: 'already participating',
        }));
        return;
      }

      res.setHeader('Content-Type', 'application/json');
      cashback.participating = true;
      cashback.balance = 1;
      res.end(JSON.stringify({status: 'ok'}));
    }, error, slow);

    return router;
  }, router = createRouter(), server = createServer((_0x1602dd, _0x5e4b60) => router['handle'](_0x1602dd, _0x5e4b60)), port = Number(process['argv'][0x2]) || 0x270f; server['listen'](port, () => { console['info']('server\x20started\x20at\x20http://127.0.0.1:' + port); });
