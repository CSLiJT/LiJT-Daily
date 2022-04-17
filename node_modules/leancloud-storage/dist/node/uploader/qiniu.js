'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../adapter'),
    getAdapter = _require.getAdapter;

var debug = require('debug')('leancloud:qiniu');
var ajax = require('../utils/ajax');
var btoa = require('../utils/btoa');

var SHARD_THRESHOLD = 1024 * 1024 * 64;

var CHUNK_SIZE = 1024 * 1024 * 16;

function upload(uploadInfo, data, file) {
  var saveOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  // Get the uptoken to upload files to qiniu.
  var uptoken = uploadInfo.token;
  var url = uploadInfo.upload_url || 'https://upload.qiniup.com';
  var fileFormData = {
    field: 'file',
    data: data,
    name: file.attributes.name
  };
  var options = {
    headers: file._uploadHeaders,
    data: {
      name: file.attributes.name,
      key: uploadInfo.key,
      token: uptoken
    },
    onprogress: saveOptions.onprogress
  };
  debug('url: %s, file: %o, options: %o', url, fileFormData, options);
  var upload = getAdapter('upload');
  return upload(url, fileFormData, options).then(function (response) {
    debug(response.status, response.data);
    if (response.ok === false) {
      var message = response.status;
      if (response.data) {
        if (response.data.error) {
          message = response.data.error;
        } else {
          message = (0, _stringify2.default)(response.data);
        }
      }
      var error = new Error(message);
      error.response = response;
      throw error;
    }
    file.attributes.url = uploadInfo.url;
    file._bucket = uploadInfo.bucket;
    file.id = uploadInfo.objectId;
    return file;
  }, function (error) {
    var response = error.response;

    if (response) {
      debug(response.status, response.data);
      error.statusCode = response.status;
      error.response = response.data;
    }
    throw error;
  });
}

function urlSafeBase64(string) {
  var base64 = btoa(unescape(encodeURIComponent(string)));
  var result = '';
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(base64), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var ch = _step.value;

      switch (ch) {
        case '+':
          result += '-';
          break;
        case '/':
          result += '_';
          break;
        default:
          result += ch;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return result;
}

var ShardUploader = function () {
  function ShardUploader(uploadInfo, data, file, saveOptions) {
    var _this = this;

    (0, _classCallCheck3.default)(this, ShardUploader);

    this.uploadInfo = uploadInfo;
    this.data = data;
    this.file = file;
    this.size = undefined;
    this.offset = 0;
    this.uploadedChunks = 0;

    var key = urlSafeBase64(uploadInfo.key);
    var uploadURL = uploadInfo.upload_url || 'https://upload.qiniup.com';
    this.baseURL = uploadURL + '/buckets/' + uploadInfo.bucket + '/objects/' + key + '/uploads';
    this.upToken = 'UpToken ' + uploadInfo.token;

    this.uploaded = 0;
    if (saveOptions && saveOptions.onprogress) {
      this.onProgress = function (_ref) {
        var loaded = _ref.loaded;

        loaded += _this.uploadedChunks * CHUNK_SIZE;
        if (loaded <= _this.uploaded) {
          return;
        }
        if (_this.size) {
          saveOptions.onprogress({
            loaded: loaded,
            total: _this.size,
            percent: loaded / _this.size * 100
          });
        } else {
          saveOptions.onprogress({ loaded: loaded });
        }
        _this.uploaded = loaded;
      };
    }
  }

  /**
   * @returns {Promise<string>}
   */


  (0, _createClass3.default)(ShardUploader, [{
    key: 'getUploadId',
    value: function getUploadId() {
      return ajax({
        method: 'POST',
        url: this.baseURL,
        headers: {
          Authorization: this.upToken
        }
      }).then(function (res) {
        return res.uploadId;
      });
    }
  }, {
    key: 'getChunk',
    value: function getChunk() {
      throw new Error('Not implemented');
    }

    /**
     * @param {string} uploadId
     * @param {number} partNumber
     * @param {any} data
     * @returns {Promise<{ partNumber: number, etag: string }>}
     */

  }, {
    key: 'uploadPart',
    value: function uploadPart(uploadId, partNumber, data) {
      return ajax({
        method: 'PUT',
        url: this.baseURL + '/' + uploadId + '/' + partNumber,
        headers: {
          Authorization: this.upToken
        },
        data: data,
        onprogress: this.onProgress
      }).then(function (_ref2) {
        var etag = _ref2.etag;
        return { partNumber: partNumber, etag: etag };
      });
    }
  }, {
    key: 'stopUpload',
    value: function stopUpload(uploadId) {
      return ajax({
        method: 'DELETE',
        url: this.baseURL + '/' + uploadId,
        headers: {
          Authorization: this.upToken
        }
      });
    }
  }, {
    key: 'upload',
    value: function upload() {
      var _this2 = this;

      var parts = [];
      return this.getUploadId().then(function (uploadId) {
        var uploadPart = function uploadPart() {
          return _promise2.default.resolve(_this2.getChunk()).then(function (chunk) {
            if (!chunk) {
              return;
            }
            var partNumber = parts.length + 1;
            return _this2.uploadPart(uploadId, partNumber, chunk).then(function (part) {
              parts.push(part);
              _this2.uploadedChunks++;
              return uploadPart();
            });
          }).catch(function (error) {
            return _this2.stopUpload(uploadId).then(function () {
              return _promise2.default.reject(error);
            });
          });
        };

        return uploadPart().then(function () {
          return ajax({
            method: 'POST',
            url: _this2.baseURL + '/' + uploadId,
            headers: {
              Authorization: _this2.upToken
            },
            data: {
              parts: parts,
              fname: _this2.file.attributes.name,
              mimeType: _this2.file.attributes.mime_type
            }
          });
        });
      }).then(function () {
        _this2.file.attributes.url = _this2.uploadInfo.url;
        _this2.file._bucket = _this2.uploadInfo.bucket;
        _this2.file.id = _this2.uploadInfo.objectId;
        return _this2.file;
      });
    }
  }]);
  return ShardUploader;
}();

var BlobUploader = function (_ShardUploader) {
  (0, _inherits3.default)(BlobUploader, _ShardUploader);

  function BlobUploader(uploadInfo, data, file, saveOptions) {
    (0, _classCallCheck3.default)(this, BlobUploader);

    var _this3 = (0, _possibleConstructorReturn3.default)(this, (BlobUploader.__proto__ || (0, _getPrototypeOf2.default)(BlobUploader)).call(this, uploadInfo, data, file, saveOptions));

    _this3.size = data.size;
    return _this3;
  }

  /**
   * @returns {Blob | null}
   */


  (0, _createClass3.default)(BlobUploader, [{
    key: 'getChunk',
    value: function getChunk() {
      if (this.offset >= this.size) {
        return null;
      }
      var chunk = this.data.slice(this.offset, this.offset + CHUNK_SIZE);
      this.offset += chunk.size;
      return chunk;
    }
  }]);
  return BlobUploader;
}(ShardUploader);

/* NODE-ONLY:start */


var BufferUploader = function (_ShardUploader2) {
  (0, _inherits3.default)(BufferUploader, _ShardUploader2);

  function BufferUploader(uploadInfo, data, file, saveOptions) {
    (0, _classCallCheck3.default)(this, BufferUploader);

    var _this4 = (0, _possibleConstructorReturn3.default)(this, (BufferUploader.__proto__ || (0, _getPrototypeOf2.default)(BufferUploader)).call(this, uploadInfo, data, file, saveOptions));

    _this4.size = data.length;
    return _this4;
  }

  /**
   * @returns {Buffer | null}
   */


  (0, _createClass3.default)(BufferUploader, [{
    key: 'getChunk',
    value: function getChunk() {
      if (this.offset >= this.size) {
        return null;
      }
      var chunk = this.data.slice(this.offset, this.offset + CHUNK_SIZE);
      this.offset += chunk.length;
      return chunk;
    }
  }]);
  return BufferUploader;
}(ShardUploader);
/* NODE-ONLY:end */

/* NODE-ONLY:start */


var StreamUploader = function (_ShardUploader3) {
  (0, _inherits3.default)(StreamUploader, _ShardUploader3);

  function StreamUploader() {
    (0, _classCallCheck3.default)(this, StreamUploader);
    return (0, _possibleConstructorReturn3.default)(this, (StreamUploader.__proto__ || (0, _getPrototypeOf2.default)(StreamUploader)).apply(this, arguments));
  }

  (0, _createClass3.default)(StreamUploader, [{
    key: '_read',

    /**
     * @param {number} [size]
     * @returns {Buffer | null}
     */
    value: function _read(size) {
      var chunk = this.data.read(size);
      if (chunk) {
        this.offset += chunk.length;
      }
      return chunk;
    }

    /**
     * @returns {Buffer | null | Promise<Buffer | null>}
     */

  }, {
    key: 'getChunk',
    value: function getChunk() {
      var _this6 = this;

      if (this.data.readableLength >= CHUNK_SIZE) {
        return this._read(CHUNK_SIZE);
      }

      if (this.data.readableEnded) {
        if (this.data.readable) {
          return this._read();
        }
        return null;
      }

      return new _promise2.default(function (resolve, reject) {
        var onReadable = function onReadable() {
          var chunk = _this6._read(CHUNK_SIZE);
          if (chunk !== null) {
            resolve(chunk);
            removeListeners();
          }
        };

        var onError = function onError(error) {
          reject(error);
          removeListeners();
        };

        var removeListeners = function removeListeners() {
          _this6.data.off('readable', onReadable);
          _this6.data.off('error', onError);
        };

        _this6.data.on('readable', onReadable);
        _this6.data.on('error', onError);
      });
    }
  }]);
  return StreamUploader;
}(ShardUploader);
/* NODE-ONLY:end */

function isBlob(data) {
  return typeof Blob !== 'undefined' && data instanceof Blob;
}

/* NODE-ONLY:start */
function isBuffer(data) {
  return typeof Buffer !== 'undefined' && Buffer.isBuffer(data);
}
/* NODE-ONLY:end */

/* NODE-ONLY:start */
function isStream(data) {
  return typeof require === 'function' && data instanceof require('stream');
}
/* NODE-ONLY:end */

module.exports = function (uploadInfo, data, file) {
  var saveOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  if (isBlob(data) && data.size >= SHARD_THRESHOLD) {
    return new BlobUploader(uploadInfo, data, file, saveOptions).upload();
  }
  /* NODE-ONLY:start */
  if (isBuffer(data) && data.length >= SHARD_THRESHOLD) {
    return new BufferUploader(uploadInfo, data, file, saveOptions).upload();
  }
  if (isStream(data)) {
    return new StreamUploader(uploadInfo, data, file, saveOptions).upload();
  }
  /* NODE-ONLY:end */
  return upload(uploadInfo, data, file, saveOptions);
};